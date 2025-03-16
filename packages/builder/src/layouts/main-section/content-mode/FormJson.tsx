import { useEffect, useState } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import JsonEditor from '../../../components/elements/JsonEditor';
import { useSettingsStore } from '../../../lib/state/settings.state';
import checkSchema from '../../../lib/checkSchema';
import { FormFieldType } from '@efie-form/core';
import Button from '../../../components/elements/Button';

export default function FormJson() {
  const { schema, currentHistoryIndex, setSchema } = useSchemaStore();
  const { setPage } = useSettingsStore();
  const [value, setValue] = useState('');
  const [isValidSchema, setIsValidSchema] = useState(false);

  useEffect(() => {
    setValue(JSON.stringify(schema, undefined, 2));
  }, [currentHistoryIndex]);

  const handleChange = (newSchema?: string) => {
    if (!newSchema) return;
    setValue(newSchema);

    try {
      const newSchema = JSON.parse(value);

      if (!checkSchema(newSchema)) return;

      setSchema(newSchema);

      const firstPage = newSchema.form.fields.find(
        (f) => f.type === FormFieldType.PAGE
      );
      if (firstPage) setPage(firstPage.id);
    } catch {
      // ignore
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-md flex-1 w-full">
        <div className="h-[95%]">
          <JsonEditor onChange={handleChange} value={value} />
        </div>
        <div className="flex justify-end h-[5%] items-center px-4">
          <Button disabled={!isValidSchema}>Save</Button>
        </div>
      </div>
    </div>
  );
}
