import { useEffect } from 'react';
import type { FormSchema } from '@efie-form/core';
import { useSchemaStore } from '../state/schema.state';

export default function useWatchSchema(callback: (schema: FormSchema) => void) {
  const { schema, currentHistoryIndex } = useSchemaStore();

  useEffect(() => {
    callback(schema);
  }, [currentHistoryIndex]);
}
