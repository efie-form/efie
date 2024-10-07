import { useFormContext } from 'react-hook-form';
import type { FormSchema } from '../../types/formSchema.ts';

function RightBar() {
  const { watch } = useFormContext<FormSchema>();

  return (
    <div className="p-4">
      <code className="whitespace-pre-wrap">
        {JSON.stringify(watch(), null, 2)}
      </code>
    </div>
  );
}

export default RightBar;
