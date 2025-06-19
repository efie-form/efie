import { useEffect, useState } from 'react';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { useSettingsStore } from '../../../lib/state/settings.state';
import checkSchema from '../../../lib/checkSchema';
import { FieldType, type FormSchema } from '@efie-form/core';
import useDebounce from '../../../lib/hooks/useDebounce';
import { motion } from 'framer-motion';
import JsonEditor from '../../../components/elements/JsonEditor';

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
    validateSchema(schema);
    setValue(JSON.stringify(schema, undefined, 2));
  }, [currentHistoryIndex, internalIndex, isUpdating]);

  const handleChange = (newSchema?: string) => {
    if (!newSchema) return;
    setValue(newSchema);
    validateSchema(newSchema);
  };

  const handleSave = () => {
    const schema = validateSchema(value);
    if (!schema || !isChanged()) return;
    setInternalIndex(prev => prev + 1);
    setIsUpdating(true);
    const firstPage = schema.form.fields.find(
      f => f.type === FieldType.PAGE,
    );
    if (firstPage) setPage(firstPage.id);
    setSchema(schema);
  };

  useDebounce(handleSave, 250, [value]);

  const validateSchema = (data: string | FormSchema) => {
    try {
      const parsedSchema = typeof data === 'string' ? JSON.parse(data) : data;
      const isValid = checkSchema(parsedSchema);
      setIsValidSchema(isValid);
      if (isValid) return parsedSchema;
    }
    catch {
      setIsValidSchema(false);
    }
  };

  const isChanged = () => {
    const prevSchema = JSON.stringify(schema);
    const newSchema = JSON.stringify(JSON.parse(value));
    return prevSchema !== newSchema;
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div className="bg-white rounded-md flex-1 w-full h-full">
        <JsonEditor onChange={handleChange} value={value} />
      </div>
      <motion.div
        className="absolute px-4 py-0.5 left-1/2 -translate-x-1/2 border border-danger bg-danger-50 text-danger-700 rounded-md"
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
