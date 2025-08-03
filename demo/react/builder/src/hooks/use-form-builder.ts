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
        // Check if the form builder is ready
        if (!formBuilderRef.current.isReady()) {
          alert('Form builder is not ready yet. Please wait for it to fully load.');
          return;
        }

        const currentSchema = await formBuilderRef.current.getSchema();
        console.log('Current schema:', currentSchema);
        alert('Check console for current schema');
      } catch (error) {
        console.error('Error getting schema:', error);
        if (error instanceof Error) {
          alert(`Error getting schema: ${error.message}`);
        } else {
          alert('Error getting schema. Check console for details.');
        }
      }
    }
  };

  const handleSetSchema = async (formBuilderRef: React.RefObject<FormBuilderRef>) => {
    if (formBuilderRef.current) {
      try {
        // Check if the form builder is ready
        if (!formBuilderRef.current.isReady()) {
          alert('Form builder is not ready yet. Please wait for it to fully load.');
          return;
        }

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
        console.log('Sample schema set successfully');
      } catch (error) {
        console.error('Error setting sample schema:', error);
        if (error instanceof Error) {
          alert(`Error setting sample schema: ${error.message}`);
        } else {
          alert('Error setting sample schema. Check console for details.');
        }
      }
    }
  };

  const handleSaveSchema = async (formBuilderRef: React.RefObject<FormBuilderRef>) => {
    if (formBuilderRef.current) {
      try {
        // Check if the form builder is ready
        if (!formBuilderRef.current.isReady()) {
          alert('Form builder is not ready yet. Please wait for it to fully load.');
          return;
        }

        const currentSchema = await formBuilderRef.current.getSchema();
        console.log('💾 Saving schema:', currentSchema);
        alert('Schema saved! Check console for details.');
      } catch (error) {
        console.error('Error saving schema:', error);
        if (error instanceof Error) {
          alert(`Error saving schema: ${error.message}`);
        } else {
          alert('Error saving schema. Check console for details.');
        }
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
