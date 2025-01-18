import { FormBuilder, FormBuilderRef } from '@efie-form/react';
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

  const handleReady = () => {
    console.log('Form builder ready, loading schema');
    // Ensure we're in the next tick when loading schema
    setTimeout(() => {
      formBuilderRef.current?.loadSchema(schema);
    }, 0);
  };

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <button
          onClick={() => {
            const currentSchema = formBuilderRef.current?.getSchema();
            console.log('Current schema:', currentSchema);
          }}
        >
          get schema
        </button>
      </div>
      <FormBuilder ref={formBuilderRef} onReady={handleReady} height={height} />
    </div>
  );
}

export default App;
