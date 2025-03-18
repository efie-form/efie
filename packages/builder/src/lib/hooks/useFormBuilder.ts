import { useCallback } from 'react';
import { useSchemaStore } from '../state/schema.state';
import { useSettingsStore } from '../state/settings.state';
import type { FormSchema } from '@efie-form/core';

export default function useFormBuilder() {
  const { setPage, setFormInputs, setHeight } = useSettingsStore();
  const { schema, currentHistoryIndex, setSchema } = useSchemaStore();

  const getSchema = useCallback(() => {
    return schema;
  }, [currentHistoryIndex]);

  const resetSchema = useCallback((data: FormSchema) => {
    setSchema(data);
    const firstPage = data.form.fields.find((field) => field.type === 'page');
    if (firstPage) {
      setPage(firstPage.id);
    }
  }, []);

  return {
    getSchema,
    setFormInputs,
    resetSchema,
    setHeight,
  };
}
