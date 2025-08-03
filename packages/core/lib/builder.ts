import type { CustomInputDef } from './types/builder-custom-input.type';
import type { FormSchema } from './types/form-schema.type';

interface IframeProps {
  onReady?: () => void;
  onSchemaChange?: (schema: FormSchema) => void;
}

interface MessageData {
  type: string;
  payload?: unknown;
  requestId?: string;
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

      switch (data.type) {
        case 'SET_SCHEMA':
          if (data.payload && this.builderInterface) {
            this.builderInterface.resetSchema(data.payload as FormSchema);
          }
          break;
        case 'GET_SCHEMA':
          this.handleAwaitableRequest(data, () => {
            return this.builderInterface?.getSchema();
          });
          break;
        case 'VALIDATE_SCHEMA':
          this.handleAwaitableRequest(data, () => {
            return this.validateCurrentSchema();
          });
          break;
        case 'GET_BUILDER_STATE':
          this.handleAwaitableRequest(data, () => {
            return this.getBuilderState();
          });
          break;
        case 'EXPORT_FORM':
          this.handleAwaitableRequest(data, () => {
            const format = (data.payload as { format: string })?.format || 'json';
            return this.exportForm(format);
          });
          break;
        case 'GET_FIELD_STATISTICS':
          this.handleAwaitableRequest(data, () => {
            return this.getFieldStatistics();
          });
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
    this.postMessage({ type: 'IFRAME_READY' });

    if (this.onReady) {
      this.onReady();
    }
  }

  /**
   * Generic handler for awaitable requests
   * @param data The message data containing the request
   * @param handler Function that returns the response data
   */
  private handleAwaitableRequest(data: MessageData, handler: () => unknown) {
    try {
      const result = handler();
      const responseType = data.requestId ? 'REQUEST_RESPONSE' : 'GET_SCHEMA_RESPONSE';

      this.postMessage({
        type: responseType,
        payload: result,
        requestId: data.requestId,
      });
    } catch (error) {
      const responseType = data.requestId ? 'REQUEST_RESPONSE' : 'GET_SCHEMA_RESPONSE';

      this.postMessage({
        type: responseType,
        payload: { error: error instanceof Error ? error.message : 'Unknown error' },
        requestId: data.requestId,
      });
    }
  }

  /**
   * Validates the current schema
   */
  private validateCurrentSchema(): { isValid: boolean; errors?: string[] } {
    if (!this.builderInterface) {
      return { isValid: false, errors: ['Builder interface not initialized'] };
    }

    const schema = this.builderInterface.getSchema();
    const errors: string[] = [];

    // Basic validation examples
    if (!schema.form.fields || schema.form.fields.length === 0) {
      errors.push('Schema must have at least one field');
    }

    // Validate each field has required properties
    schema.form.fields?.forEach((field, index) => {
      if (!field.type) {
        errors.push(`Field at index ${index} is missing type`);
      }
      if ('form' in field && (!field.form.name || field.form.name.trim() === '')) {
        errors.push(`Field at index ${index} is missing or has empty name`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * Gets the current builder state
   */
  private getBuilderState(): { selectedFieldId?: string; mode: string } {
    // This would need to be implemented based on your actual builder interface
    // For now, return a basic state
    return {
      selectedFieldId: undefined,
      mode: 'design',
    };
  }

  /**
   * Exports the form in the specified format
   */
  private exportForm(format: string): string {
    if (!this.builderInterface) {
      throw new Error('Builder interface not initialized');
    }

    const schema = this.builderInterface.getSchema();

    switch (format) {
      case 'json':
        return JSON.stringify(schema, null, 2);
      case 'typescript':
        return `export const formSchema = ${JSON.stringify(schema, null, 2)} as const;`;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Gets field statistics
   */
  private getFieldStatistics(): { totalFields: number; fieldTypes: Record<string, number> } {
    if (!this.builderInterface) {
      return { totalFields: 0, fieldTypes: {} };
    }

    const schema = this.builderInterface.getSchema();
    const fieldTypes: Record<string, number> = {};

    schema.form.fields?.forEach((field) => {
      fieldTypes[field.type] = (fieldTypes[field.type] || 0) + 1;
    });

    return {
      totalFields: schema.form.fields?.length || 0,
      fieldTypes,
    };
  }

  private notifySchemaChange(schema: FormSchema) {
    this.postMessage({
      type: 'SCHEMA_CHANGED',
      payload: schema,
    });

    if (this.onSchemaChange) {
      this.onSchemaChange(schema);
    }
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
