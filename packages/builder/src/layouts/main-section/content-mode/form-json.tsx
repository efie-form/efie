import { FieldType, type FormSchema, validateSchema } from '@efie-form/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import JsonEditor from '../../../components/elements/json-editor';
import useDebounce from '../../../lib/hooks/use-debounce';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';

export default function FormJson() {
  const { schema, currentHistoryIndex, setSchema } = useSchemaStore();
  const { setPage } = useSettingsStore();
  const [value, setValue] = useState('{}');
  const [isValidSchema, setIsValidSchema] = useState(true);
  const [internalIndex, setInternalIndex] = useState(currentHistoryIndex);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isUpdating && internalIndex >= currentHistoryIndex) {
      if (internalIndex === currentHistoryIndex) setIsUpdating(false);
      return;
    }
    setIsUpdating(false);
    checkSchema(schema);
    setValue(JSON.stringify(schema, undefined, 2));
  }, [currentHistoryIndex, internalIndex, isUpdating, schema]);

  const handleChange = (newSchema?: string) => {
    if (!newSchema) return;
    setValue(newSchema);
    checkSchema(newSchema);
  };

  const handleSave = () => {
    const schema = checkSchema(value);
    if (!schema || !isChanged()) return;
    setInternalIndex((prev) => prev + 1);
    setIsUpdating(true);
    const firstPage = schema.form.fields.find((f) => f.type === FieldType.PAGE);
    if (firstPage) setPage(firstPage.id);
    setSchema(schema);
  };

  useDebounce(handleSave, 250, [value]);

  function checkSchema(data: string | FormSchema) {
    try {
      const parsedSchema = typeof data === 'string' ? JSON.parse(data) : data;
      const isValid = validateSchema(parsedSchema);
      setIsValidSchema(isValid);
      if (isValid) return parsedSchema;
    } catch {
      setIsValidSchema(false);
    }
  }

  const isChanged = () => {
    const prevSchema = JSON.stringify(schema);
    const newSchema = JSON.stringify(JSON.parse(value));
    return prevSchema !== newSchema;
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div className="h-full w-full flex-1 rounded-md bg-white">
        <JsonEditor onChange={handleChange} value={value} />
      </div>
      <motion.div
        className="-translate-x-1/2 absolute left-1/2 rounded-md border border-danger bg-danger-50 px-4 py-0.5 text-danger-700"
        initial={{
          translateY: '100%',
          bottom: -5,
          opacity: 0,
        }}
        animate={{
          translateY: isValidSchema ? '100%' : 0,
          bottom: isValidSchema ? -5 : 16,
          opacity: isValidSchema ? 0 : 1,
        }}
      >
        <p className="typography-body2">Invalid Schema</p>
      </motion.div>
    </div>
  );
}
