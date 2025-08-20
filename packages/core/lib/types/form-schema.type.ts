import type { FormField } from './form-field.type';
import type { CustomActionDefinition, Rule } from './root-rule.type';

// Property value
export interface FormSchema {
  version: string;
  form: {
    fields: FormField[];
    rules?: Rule[]; // ordered; index = precedence
    actionDefinitions?: CustomActionDefinition[]; // custom actions registry
  };
}
