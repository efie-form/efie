import type { CustomInputDef } from './types/builder-custom-input.type';
import type { FormSchema } from './types/form-schema.type';

interface BuilderProps {
  onSchemaChange?: (schema: FormSchema) => void;
  onReady?: () => void;
}

interface MessageData {
  source: string;
  type: string;
  payload?: unknown;
  requestId?: string;
}

interface PendingRequest<T = unknown> {
  resolve: (value: T) => void;
  reject: (error: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
}

export default class Client {
  private onSchemaChange?: (schema: FormSchema) => void;
  private onReady?: () => void;
  private messageQueue: MessageData[] = [];
  private isConnected = false;
  private messageHandler: (event: MessageEvent) => void;
  private pendingRequests = new Map<string, PendingRequest<unknown>>();
  private requestCounter = 0;

  constructor(props: BuilderProps) {
    this.onSchemaChange = props.onSchemaChange;
    this.onReady = props.onReady;
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
        if (this.onReady) {
          this.onReady();
        }
        this.processMessageQueue();
        break;
      case 'SCHEMA_CHANGED':
        if (this.onSchemaChange && data.payload) {
          this.onSchemaChange(data.payload as FormSchema);
        }
        break;
      case 'REQUEST_RESPONSE':
        this.handleRequestResponse(data);
        break;
      case 'GET_SCHEMA_RESPONSE':
        this.handleRequestResponse(data);
        break;
    }
  }

  private handleRequestResponse(data: MessageData) {
    const requestId = data.requestId || 'default';
    const pendingRequest = this.pendingRequests.get(requestId);

    if (pendingRequest) {
      console.log('Client: Received response:', data.payload);
      clearTimeout(pendingRequest.timeout);
      this.pendingRequests.delete(requestId);
      pendingRequest.resolve(data.payload);
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

    this.postMessage(message);
    // if (this.isConnected) {
    //   this.postMessage(message);
    // } else {
    //   console.log('Client: Not connected, queuing message:', message);
    //   this.messageQueue.push(message);
    // }
  }

  /**
   * Generic method to send a request and await a response from the builder
   * @param requestType The type of request to send
   * @param payload The payload to send with the request
   * @param timeout Timeout in milliseconds (default: 5000)
   * @returns Promise that resolves with the response payload
   */
  private sendAwaitableRequest<T>(
    requestType: string,
    payload?: unknown,
    timeout = 5000,
  ): Promise<T> {
    console.log(`Client: Sending awaitable request: ${requestType}`);
    return new Promise((resolve, reject) => {
      const requestId = `${requestType.toLowerCase()}-request-${++this.requestCounter}`;

      const timeoutHandle = setTimeout(() => {
        this.pendingRequests.delete(requestId);
        reject(new Error(`Timeout waiting for ${requestType} response`));
      }, timeout);

      this.pendingRequests.set(requestId, {
        resolve: resolve as (value: unknown) => void,
        reject,
        timeout: timeoutHandle,
      });

      this.sendMessage(requestType, payload, requestId);
    });
  } // Public API methods
  setSchema(schema: FormSchema) {
    this.sendMessage('SET_SCHEMA', schema);
  }

  getSchema(): Promise<FormSchema> {
    return this.sendAwaitableRequest<FormSchema>('GET_SCHEMA');
  }

  /**
   * Validates the current schema and returns validation result
   */
  validateSchema(): Promise<{ isValid: boolean; errors?: string[] }> {
    return this.sendAwaitableRequest<{ isValid: boolean; errors?: string[] }>('VALIDATE_SCHEMA');
  }

  /**
   * Gets the current builder state (selected field, mode, etc.)
   */
  getBuilderState(): Promise<{ selectedFieldId?: string; mode: string }> {
    return this.sendAwaitableRequest<{ selectedFieldId?: string; mode: string }>(
      'GET_BUILDER_STATE',
    );
  }

  /**
   * Exports the form configuration in a specific format
   */
  exportForm(format: 'json' | 'typescript'): Promise<string> {
    return this.sendAwaitableRequest<string>('EXPORT_FORM', { format });
  }

  /**
   * Gets field statistics (count, types, etc.)
   */
  getFieldStatistics(): Promise<{ totalFields: number; fieldTypes: Record<string, number> }> {
    return this.sendAwaitableRequest<{ totalFields: number; fieldTypes: Record<string, number> }>(
      'GET_FIELD_STATISTICS',
    );
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

  cleanup() {
    window.removeEventListener('message', this.messageHandler);
  }

  destroy() {
    // Clear any pending requests
    // for (const [, request] of this.pendingRequests) {
    //   clearTimeout(request.timeout);
    //   request.reject(new Error('Client destroyed while request was pending'));
    // }
    // this.isConnected = false;
    // this.messageQueue = [];
    // this.pendingRequests.clear();
  }
}
