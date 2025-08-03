import type { CustomInputDef } from './types/builder-custom-input.type';
import type { FormSchema } from './types/form-schema.type';

interface BuilderProps {
  onSchemaChange?: (schema: FormSchema) => void;
}

interface MessageData {
  source: string;
  type: string;
  payload?: unknown;
  requestId?: string;
}

export default class Client {
  private onSchemaChange?: (schema: FormSchema) => void;
  private messageQueue: MessageData[] = [];
  private isConnected = false;
  private messageHandler: (event: MessageEvent) => void;
  private pendingSchemaRequests = new Map<
    string,
    {
      resolve: (schema: FormSchema) => void;
      reject: (error: Error) => void;
      timeout: ReturnType<typeof setTimeout>;
    }
  >();
  private requestCounter = 0;

  constructor(props: BuilderProps) {
    this.onSchemaChange = props.onSchemaChange;
    this.messageHandler = this.handleMessage.bind(this);
    this.setupMessageListener();
  }

  private handleMessage(event: MessageEvent) {
    // Check if the message is from our iframe by source property instead of origin
    const data: MessageData = event.data;
    if (data.source !== 'efie-form-builder') return;

    switch (data.type) {
      case 'IFRAME_READY':
        this.isConnected = true;
        this.processMessageQueue();
        break;
      case 'SCHEMA_CHANGED':
        if (this.onSchemaChange && data.payload) {
          this.onSchemaChange(data.payload as FormSchema);
        }
        break;
      case 'GET_SCHEMA_RESPONSE':
        this.handleSchemaResponse(data);
        break;
    }
  }

  private handleSchemaResponse(data: MessageData) {
    const requestId = data.requestId || 'default';
    const pendingRequest = this.pendingSchemaRequests.get(requestId);

    if (pendingRequest) {
      console.log('Client: Received schema response:', data.payload);
      clearTimeout(pendingRequest.timeout);
      this.pendingSchemaRequests.delete(requestId);
      pendingRequest.resolve(data.payload as FormSchema);
    }
  }

  private setupMessageListener() {
    window.addEventListener('message', this.messageHandler);
  }

  private processMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.postMessage(message);
      }
    }
  }

  private postMessage(data: MessageData) {
    const iframe = document.getElementById('efie-form-builder') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      // TODO: better way to handle origin?
      iframe.contentWindow.postMessage(data, 'http://localhost:3074');
    }
  }

  private sendMessage(type: string, payload?: unknown, requestId?: string) {
    const message: MessageData = { type, payload, source: 'efie-form-builder' };
    if (requestId) {
      message.requestId = requestId;
    }

    if (this.isConnected) {
      console.log('Client: Sending message:', message);
      this.postMessage(message);
    } else {
      this.messageQueue.push(message);
    }
  } // Public API methods
  setSchema(schema: FormSchema) {
    this.sendMessage('SET_SCHEMA', schema);
  }

  getSchema(): Promise<FormSchema> {
    console.log('Client: Requesting schema from iframe');
    return new Promise((resolve, reject) => {
      // Check if client is connected, if not, reject immediately with a more specific error
      if (!this.isConnected) {
        reject(
          new Error(
            'Client not connected to iframe. Please wait for the form builder to fully load.',
          ),
        );
        return;
      }

      const requestId = `schema-request-${++this.requestCounter}`;

      const timeout = setTimeout(() => {
        this.pendingSchemaRequests.delete(requestId);
        reject(new Error('Timeout waiting for schema response'));
      }, 5000); // 5 second timeout

      this.pendingSchemaRequests.set(requestId, {
        resolve,
        reject,
        timeout,
      });

      this.sendMessage('GET_SCHEMA', undefined, requestId);
    });
  }

  setFormInputs(formInputs: CustomInputDef[]) {
    this.sendMessage('SET_FORM_INPUTS', formInputs);
  }

  setHeight(height: number) {
    this.sendMessage('SET_HEIGHT', height);
  }

  setFieldNameEditable(editable: boolean) {
    this.sendMessage('SET_FIELD_NAME_EDITABLE', editable);
  }

  setInputReusable(reusable: boolean) {
    this.sendMessage('SET_INPUT_REUSABLE', reusable);
  }

  setMaxHistories(maxHistories: number) {
    this.sendMessage('SET_MAX_HISTORIES', maxHistories);
  }

  isReady(): boolean {
    return this.isConnected;
  }

  destroy() {
    // Clean up any listeners or resources
    window.removeEventListener('message', this.messageHandler);

    // Clear any pending schema requests
    for (const [, request] of this.pendingSchemaRequests) {
      clearTimeout(request.timeout);
      request.reject(new Error('Client destroyed while request was pending'));
    }

    this.isConnected = false;
    this.messageQueue = [];
    this.pendingSchemaRequests.clear();
  }
}
