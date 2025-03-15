import type { FormSchema } from '@efie-form/core';

export default function checkSchema(schema: unknown): FormSchema | undefined {
  return schema as FormSchema;
}
