import type { FormField } from './form-field.type';
import type { RootRule } from './root-rule.type';

// Property value
export interface FormSchema {
  version: string;
  form: {
    fields: FormField[];
    rules?: RootRule[];
  };
}
