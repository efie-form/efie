import type { CustomInputDef } from './types/builder-custom-input.type';
import type { FormSchema } from './types/form-schema.type';

interface BuilderProps {
  onSchemaChange?: (schema: FormSchema) => void;
}

interface MessageData {
  source: string;
  type: string;
  payload?: unknown;
}

export default class Client {
  private onSchemaChange?: (schema: FormSchema) => void;
  private messageQueue: MessageData[] = [];
  private isConnected = false;

  constructor(props: BuilderProps) {
    console.log('Client: Initializing with props:', props);
    this.onSchemaChange = props.onSchemaChange;
    this.setupMessageListener();
  }

  private setupMessageListener() {
    window.addEventListener('message', (event) => {
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
      }
    });
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
      iframe.contentWindow.postMessage(data, window.location.origin);
    }
  }

  private sendMessage(type: string, payload?: unknown) {
    const message: MessageData = { type, payload, source: 'efie-form-builder' };

    if (this.isConnected) {
      console.log('Client: Sending message:', message);
      this.postMessage(message);
    } else {
      console.log('Client: Not connected, queuing message');
      this.messageQueue.push(message);
    }
  } // Public API methods
  setSchema(schema: FormSchema) {
    this.sendMessage('SET_SCHEMA', schema);
  }

  getSchema(): Promise<FormSchema> {
    console.log('Client: Requesting schema from iframe');
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        reject(new Error('Timeout waiting for schema response'));
      }, 5000); // 5 second timeout

      const handleMessage = (event: MessageEvent) => {
        console.log('Client: Received message:', event.data);
        if (event.data.type === 'GET_SCHEMA_RESPONSE') {
          clearTimeout(timeout);
          window.removeEventListener('message', handleMessage);
          console.log('Client: Received schema response:', event.data.payload);
          resolve(event.data.payload);
        }
      };

      window.addEventListener('message', handleMessage);
      this.sendMessage('GET_SCHEMA');
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

  destroy() {
    // Clean up any listeners or resources
    this.isConnected = false;
    this.messageQueue = [];
  }
}
