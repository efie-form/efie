import { useRef, useState, useEffect } from 'react';
import { FormBuilder, FormBuilderRef, FormFieldType, StatefulForm } from '@efie-form/react';

/**
 * Example of using FormBuilder and StatefulForm together
 */
function FormBuilderExample() {
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const [height, setHeight] = useState(500);
  const [schema, setSchema] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Adjust height based on window size
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight * 0.7);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get the current schema from the form builder
  const handleGetSchema = () => {
    if (formBuilderRef.current) {
      const currentSchema = formBuilderRef.current.getSchema();
      setSchema(currentSchema);
      setShowPreview(true);
    }
  };

  return (
    <div className="form-builder-example">
      <div className="controls">
        <h1>Form Builder Example</h1>
        <p>Build your form using the drag-and-drop interface below, then click "Preview Form" to see it in action.</p>
        <button onClick={handleGetSchema} className="preview-button">
          Preview Form
        </button>
      </div>

      {!showPreview ? (
        <div className="builder-container">
          <FormBuilder
            ref={formBuilderRef}
            height={height}
            formInputs={[
              {
                id: 'short_text',
                label: 'Text Field',
                type: FormFieldType.SHORT_TEXT,
              },
              {
                id: 'long_text',
                label: 'Text Area',
                type: FormFieldType.LONG_TEXT,
              },
              {
                id: 'number',
                label: 'Number',
                type: FormFieldType.NUMBER,
              },
              {
                id: 'single_choice',
                label: 'Single Choice',
                type: FormFieldType.SINGLE_CHOICE,
              },
              {
                id: 'multiple_choices',
                label: 'Multiple Choices',
                type: FormFieldType.MULTIPLE_CHOICES,
              },
            ]}
          />
        </div>
      ) : (
        <div className="preview-container">
          <div className="preview-header">
            <h2>Form Preview</h2>
            <button onClick={() => setShowPreview(false)} className="back-button">
              Back to Editor
            </button>
          </div>
          
          {schema ? (
            <StatefulForm
              schema={schema}
              onSubmit={(values) => console.log('Form submitted:', values)}
            />
          ) : (
            <p>No schema available. Please build a form first.</p>
          )}
        </div>
      )}

      <style>{`
        .form-builder-example {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .controls {
          margin-bottom: 20px;
        }
        
        .preview-button, .back-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        .preview-button:hover, .back-button:hover {
          background-color: #4338ca;
        }
        
        .builder-container {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .preview-container {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
        }
        
        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}

export default FormBuilderExample;
