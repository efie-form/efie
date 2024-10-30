import { FormBuilder } from '@efie-form/react';
import { useEffect } from 'react';

function App() {
  useEffect(() => {}, []);

  if (typeof window !== 'undefined') {
    return <></>;
  }

  return (
    <>
      <FormBuilder json="abc" />
    </>
  );
}

export default App;
