import type { CustomInputDef } from './types/builder-custom-input.type';
import type { FormSchema } from './types/form-schema.type';
import getDefaultSchema from './utils/default-schema/get-default-schema';

interface IframeProps {
  onReady?: () => void;
  onSchemaChange?: (schema: FormSchema) => void;
  builderInterface: BuilderInterface;
}

interface MessageData {
  type: string;
  payload?: unknown;
  requestId?: string;
}

export interface BuilderInterface {
  getSchema: () => FormSchema | undefined;
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

  constructor(props: IframeProps) {
    const { onReady, onSchemaChange, builderInterface } = props;
    this.onReady = onReady;
    this.onSchemaChange = onSchemaChange;
    this.builderInterface = builderInterface;
    this.loadDefaultSchema();
    this.setupMessageListener();
    this.notifyReady();
  }

  private setupMessageListener() {
    window.addEventListener('message', (event) => {
      // Only listen to messages from the parent window
      if (event.source !== window.parent) return;

      const data: MessageData = event.data;

      switch (data.type) {
        case 'SET_SCHEMA':
          if (data.payload && this.builderInterface) {
            this.builderInterface.resetSchema(data.payload as FormSchema);
          }
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

  private loadDefaultSchema() {
    this.builderInterface?.resetSchema(getDefaultSchema('v1'));
  }

  private notifyReady() {
    // Send ready message to parent

    this.onReady?.();

    this.postMessage({ type: 'IFRAME_READY' });
  }

  private notifySchemaChange(schema: FormSchema) {
    this.postMessage({
      type: 'SCHEMA_CHANGED',
      payload: schema,
    });

    this.onSchemaChange?.(schema);
  }

  private postMessage(message: MessageData) {
    window.parent.postMessage(
      {
        ...message,
        source: 'efie-form-builder',
      },
      '*',
    );
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
