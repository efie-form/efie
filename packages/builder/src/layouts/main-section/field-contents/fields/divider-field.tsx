import {
  type DividerFormField,
} from '@efie-form/core';

interface DividerFieldProps {
  field: DividerFormField;
}

function DividerField({ field }: DividerFieldProps) {
  return (
    <div className="py-1" key={field.id}>
      <hr className="my-4 mx-auto w-full border-t border-t-neutral-400" />
    </div>
  );
}

export default DividerField;
