import type { FormBuilderRef } from '@efie-form/react';
import { FormBuilder, FormFieldType } from '@efie-form/react';
import { schema } from './schema';
import { useEffect, useRef, useState } from 'react';

function App() {
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
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
        schema={schema}
        formInputs={[
          {
            id: 'flfCYesTVJ',
            label: 'Short Text',
            type: FormFieldType.SHORT_TEXT,
          },
          {
            id: 'flfCYesDeq',
            label: 'Long Text',
            type: FormFieldType.LONG_TEXT,
          },
          {
            id: 'fd123',
            label: 'Number',
            type: FormFieldType.NUMBER,
          },
        ]}
      />
    </div>
  );
}

export default App;
