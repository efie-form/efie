import type { FormBuilderRef, FormSchema } from '@efie-form/react';
import { FieldType } from '@efie-form/react';
import { useEffect, useState } from 'react';

export function useFormBuilder() {
  const [schema, setSchema] = useState<FormSchema | undefined>();
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Account for topbar height (64px) and some padding
        setHeight(window.innerHeight - 80);
      }, 100);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSchemaChange = (newSchema: FormSchema) => {
    setSchema(newSchema);
  };

  const handleGetSchema = async (formBuilderRef: React.RefObject<FormBuilderRef>) => {
    if (formBuilderRef.current) {
      try {
        const currentSchema = await formBuilderRef.current.getSchema();
        console.log('Current schema:', currentSchema);
        alert('Check console for current schema');
      } catch (error) {
        console.error('Error getting schema:', error);
      }
    }
  };

  const handleSetSchema = (formBuilderRef: React.RefObject<FormBuilderRef>) => {
    if (formBuilderRef.current) {
      const sampleSchema: FormSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'page1',
              type: FieldType.PAGE,
              children: [
                {
                  id: 'field1',
                  type: FieldType.SHORT_TEXT,
                  form: {
                    name: 'sample_field',
                  },
                  props: [
                    {
                      type: 'label',
                      value: 'Sample Text Field',
                    },
                  ],
                },
              ],
              props: [
                {
                  type: 'page_name',
                  value: 'Sample Page',
                },
              ],
            },
          ],
          rules: [],
        },
      };
      formBuilderRef.current.setSchema(sampleSchema);
    }
  };

  const handleSaveSchema = async (formBuilderRef: React.RefObject<FormBuilderRef>) => {
    if (formBuilderRef.current) {
      try {
        const currentSchema = await formBuilderRef.current.getSchema();
        console.log('💾 Saving schema:', currentSchema);
        alert('Schema saved! Check console for details.');
      } catch (error) {
        console.error('Error saving schema:', error);
        alert('Error saving schema. Check console for details.');
      }
    }
  };

  return {
    schema,
    height,
    handleSchemaChange,
    handleGetSchema,
    handleSetSchema,
    handleSaveSchema,
  };
}
