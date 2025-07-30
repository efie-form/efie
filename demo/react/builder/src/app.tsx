import type { FormBuilderRef } from '@efie-form/react';
import { FieldType, FormBuilder } from '@efie-form/react';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [schema, setSchema] = useState();
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setHeight(window.innerHeight);
      }, 100);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <FormBuilder
        ref={formBuilderRef}
        height={height}
        inputNonReusable
        maxHistories={25}
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
  );
}

export default App;
