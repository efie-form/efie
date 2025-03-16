import type { FormSchema } from '@efie-form/core';

export default function checkSchema(
  schema: FormSchema | unknown
): schema is FormSchema {
  return true;
}
