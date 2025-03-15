import { useEffect, useState } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import JsonEditor from '../../../components/elements/JsonEditor';
import { useSettingsStore } from '../../../lib/state/settings.state';
import checkSchema from '../../../lib/checkSchema';
import { FormFieldType } from '@efie-form/core';

export default function FormJson() {
  const { schema, currentHistoryIndex, setSchema } = useSchemaStore();
  const { setPage } = useSettingsStore();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(JSON.stringify(schema, undefined, 2));
  }, [currentHistoryIndex]);

  useEffect(() => {
    try {
      const newSchema = JSON.parse(value);

      const validatedSchema = checkSchema(newSchema);

      if (validatedSchema) {
        setSchema(validatedSchema);
        const firstPage = validatedSchema.form.fields.find(
          (f) => f.type === FormFieldType.PAGE
        );
        if (firstPage) setPage(firstPage.id);
      }
    } catch {
      // ignore
    }
  }, [value]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-md flex-1 w-full">
        <JsonEditor onChange={setValue} value={value} />
      </div>
    </div>
  );
}
