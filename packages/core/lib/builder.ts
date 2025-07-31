import type { CustomInputDef } from './types/builder-custom-input.type';
import type { FormSchema } from './types/form-schema.type';

interface IframeProps {
  onReady?: () => void;
  onSchemaChange?: (schema: FormSchema) => void;
}

interface MessageData {
  type: string;
  payload?: unknown;
}

export interface BuilderInterface {
  getSchema: () => FormSchema;
  resetSchema: (schema: FormSchema) => void;
  setFormInputs: (formInputs: CustomInputDef[]) => void;
  setHeight: (height: number) => void;
  setFieldNameEditable: (editable: boolean) => void;
  setIsInputReusable: (reusable: boolean) => void;
  setMaxHistories: (maxHistories: number) => void;
}

export default class Builder {
  private onReady?: () => void;
  private onSchemaChange?: (schema: FormSchema) => void;
  private builderInterface: BuilderInterface | null = null;

  constructor({ onReady, onSchemaChange }: IframeProps) {
    this.onReady = onReady;
    this.onSchemaChange = onSchemaChange;
    this.setupMessageListener();
    this.notifyReady();
  }

  private setupMessageListener() {
    window.addEventListener('message', (event) => {
      // Only listen to messages from the parent window
      if (event.source !== window.parent) return;

      const data: MessageData = event.data;
      console.log('Builder: Received message:', data);

      switch (data.type) {
        case 'SET_SCHEMA':
          if (data.payload && this.builderInterface) {
            this.builderInterface.resetSchema(data.payload as FormSchema);
          }
          break;
        case 'GET_SCHEMA':
          this.handleGetSchema();
          break;
        case 'SET_FORM_INPUTS':
          if (data.payload && this.builderInterface) {
            this.builderInterface.setFormInputs(data.payload as CustomInputDef[]);
          }
          break;
        case 'SET_HEIGHT':
          if (typeof data.payload === 'number' && this.builderInterface) {
            this.builderInterface.setHeight(data.payload);
          }
          break;
        case 'SET_FIELD_NAME_EDITABLE':
          if (typeof data.payload === 'boolean' && this.builderInterface) {
            this.builderInterface.setFieldNameEditable(data.payload);
          }
          break;
        case 'SET_INPUT_REUSABLE':
          if (typeof data.payload === 'boolean' && this.builderInterface) {
            this.builderInterface.setIsInputReusable(data.payload);
          }
          break;
        case 'SET_MAX_HISTORIES':
          if (typeof data.payload === 'number' && this.builderInterface) {
            this.builderInterface.setMaxHistories(data.payload);
          }
          break;
      }
    });
  }

  private notifyReady() {
    // Send ready message to parent
    window.parent.postMessage({ type: 'IFRAME_READY' }, '*');

    if (this.onReady) {
      this.onReady();
    }
  }

  private handleGetSchema() {
    console.log('Builder: Handling GET_SCHEMA request');
    if (this.builderInterface) {
      const schema = this.builderInterface.getSchema();
      console.log('Builder: Got schema:', schema);
      window.parent.postMessage(
        {
          type: 'GET_SCHEMA_RESPONSE',
          payload: schema,
        },
        '*',
      );
      console.log('Builder: Sent schema response');
    } else {
      console.log('Builder: No builderInterface available');
    }
  }

  private notifySchemaChange(schema: FormSchema) {
    window.parent.postMessage(
      {
        type: 'SCHEMA_CHANGED',
        payload: schema,
      },
      '*',
    );

    if (this.onSchemaChange) {
      this.onSchemaChange(schema);
    }
  }

  // Method to be called by the form builder when it's initialized
  setBuilderInterface(builderInterface: BuilderInterface) {
    this.builderInterface = builderInterface;
  }

  // Method to be called when schema changes in the builder
  onBuilderSchemaChange(schema: FormSchema) {
    this.notifySchemaChange(schema);
  }

  destroy() {
    // Clean up any listeners or resources
    this.builderInterface = null;
  }
}
