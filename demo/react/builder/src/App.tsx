import { FormBuilder, FormBuilderRef } from '@efie-form/react';
import { schema } from './schema';
import { useEffect, useRef, useState } from 'react';

function App() {
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setHeight(window.innerHeight);
      }, 100);
    };

    // Set initial height
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleReady = () => {
    console.log('ready');
    formBuilderRef.current?.loadSchema(schema);
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
          onClick={() => console.log(formBuilderRef.current?.getSchema())}
        >
          get schema
        </button>
      </div>
      <FormBuilder ref={formBuilderRef} onReady={handleReady} height={height} />
    </div>
  );
}

export default App;
