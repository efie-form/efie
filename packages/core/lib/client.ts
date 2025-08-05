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

export default class Client {
  private onSchemaChange?: (schema: FormSchema) => void;
  private onReady?: () => void;
  private messageQueue: MessageData[] = [];
  private isConnected = false;
  private messageHandler: (event: MessageEvent) => void;

  constructor(props: BuilderProps) {
    this.onSchemaChange = props.onSchemaChange;
    this.onReady = props.onReady;
    this.messageHandler = this.handleMessage.bind(this);
    this.setupMessageListener();
  }

  private handleMessage(event: MessageEvent) {
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
  }

  setSchema(schema: FormSchema) {
    this.sendMessage('SET_SCHEMA', schema);
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
