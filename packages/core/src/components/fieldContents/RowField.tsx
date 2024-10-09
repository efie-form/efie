import type { FormFieldRow } from '../../types/formSchema.ts';
import RenderField from '../RenderField.tsx';

interface RowFieldProps {
  field: FormFieldRow;
}

function RowField({ field }: RowFieldProps) {
  return (
    <div className="flex">
      {field.children.map((child) => (
        <RenderField key={`${field.id}-${child.id}`} field={child} />
      ))}
    </div>
  );
}

export default RowField;
