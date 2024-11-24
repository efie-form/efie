import { Form } from '@efie-form/form';
import { sampleSchema } from './sample-schema.ts';

function App() {
  return (
    <>
      <Form schema={sampleSchema} />
    </>
  );
}

export default App;
