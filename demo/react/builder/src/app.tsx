import type { FormBuilderRef, FormSchema } from '@efie-form/react';
import { FieldType, FormBuilder } from '@efie-form/react';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [schema, setSchema] = useState<FormSchema | undefined>();
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const [height, setHeight] = useState(window.innerHeight); // Leave some space for controls

  useEffect(() => {
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setHeight(window.innerHeight - 100);
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
    console.log('Schema changed:', newSchema);
  };

  const handleGetSchema = async () => {
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

  const handleSetSchema = () => {
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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Controls */}
      <div
        style={{
          padding: '10px',
          borderBottom: '1px solid #ccc',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <button type="button" onClick={handleGetSchema}>
          Get Schema
        </button>
        <button type="button" onClick={handleSetSchema}>
          Set Sample Schema
        </button>
        <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#666' }}>
          Height: {height}px | Schema loaded: {schema ? 'Yes' : 'No'}
        </span>
      </div>

      {/* Form Builder */}
      <div style={{ flex: 1 }}>
        <FormBuilder
          ref={formBuilderRef}
          height={height}
          inputNonReusable={false}
          maxHistories={25}
          onSchemaChange={handleSchemaChange}
          iframeSrc="http://localhost:3074"
          formInputs={[
            {
              id: 'long_text',
              label: 'Short Text',
              type: FieldType.SHORT_TEXT,
            },
            {
              id: 'multiple_choices',
              label: 'Long Text',
              type: FieldType.LONG_TEXT,
            },
            {
              id: 'fd123',
              label: 'Number',
              type: FieldType.NUMBER,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
