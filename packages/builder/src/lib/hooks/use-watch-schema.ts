import type { FormSchema } from '@efie-form/core';
import { useEffect } from 'react';
import { useSchemaStore } from '../state/schema.state';

export default function useWatchSchema(callback: (schema: FormSchema) => void) {
  const { schema } = useSchemaStore();

  useEffect(() => {
    callback(schema);
  }, [callback, schema]);
}
