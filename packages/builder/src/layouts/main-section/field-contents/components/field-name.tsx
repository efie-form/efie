import type { FormField } from '@efie-form/core';

interface FieldNameProps {
  field: FormField;
}

export default function FieldName({ field }: FieldNameProps) {
  return (
    <div className="absolute bottom-0.5 right-0 rounded-b-sm bg-primary translate-y-full px-2 py-0.5">
      <p className="text-white typography-body3 whitespace-pre">{field.sys.name}</p>
    </div>
  );
}
