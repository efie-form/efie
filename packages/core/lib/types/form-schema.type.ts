import type { RootRule } from './root-rule.type';
import type { FormField } from './form-field.type';

// Property value
export interface FormSchema {
  version: string;
  form: {
    fields: FormField[];
    rules?: RootRule[];
  };
}
