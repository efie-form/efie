import type { DividerFormField } from '@efie-form/core';

interface DividerFieldProps {
  field: DividerFormField;
}

function DividerField({ field }: DividerFieldProps) {
  return (
    <div className="py-1" key={field.id}>
      <hr className="mx-auto my-4 w-full border-t border-t-neutral-400" />
    </div>
  );
}

export default DividerField;
