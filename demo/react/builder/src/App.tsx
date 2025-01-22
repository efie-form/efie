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
    formBuilderRef.current?.loadSchema(schema);
  };

  return (
    <div>
      <FormBuilder ref={formBuilderRef} onReady={handleReady} height={height} />
    </div>
  );
}

export default App;
