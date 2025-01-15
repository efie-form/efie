import { FormBuilder, FormBuilderRef } from '@efie-form/react';
import { schema } from './schema';
import { useRef } from 'react';

function App() {
  const formBuilderRef = useRef<FormBuilderRef>(null);

  const handleReady = () => {
    formBuilderRef.current?.loadSchema(schema);
  };

  return (
    <div style={{ height: '100vh' }}>
      <FormBuilder ref={formBuilderRef} onReady={handleReady} />
    </div>
  );
}

export default App;
