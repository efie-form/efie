import type { FormBuilderRef, FormSchema } from '@efie-form/react';
import { FieldType } from '@efie-form/react';
import { useEffect, useState } from 'react';

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
            type: 'name',
            value: 'Sample Page',
          },
        ],
      },
    ],
    rules: [],
  },
};

export function useFormBuilder() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Account for topbar height (64px) and some padding
        setHeight(window.innerHeight - 80);
      }, 100) as unknown as number;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGetSchema = async (formBuilderRef: React.RefObject<FormBuilderRef>) => {
    if (!formBuilderRef.current) return;
    const currentSchema = formBuilderRef.current.getSchema();
    console.log('📄 Getting schema from form builder:', currentSchema);
  };

  const handleSetSchema = async (formBuilderRef: React.RefObject<FormBuilderRef>) => {
    if (!formBuilderRef.current) return;
    formBuilderRef.current.setSchema(sampleSchema);
  };

  const handleSaveSchema = async (formBuilderRef: React.RefObject<FormBuilderRef>) => {
    if (!formBuilderRef.current) return;
    const currentSchema = formBuilderRef.current.getSchema();
    console.log('💾 Saving schema:', currentSchema);
    alert('Schema saved! Check console for details.');
  };

  return {
    height,
    handleGetSchema,
    handleSetSchema,
    handleSaveSchema,
  };
}
