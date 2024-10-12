import type { FormFieldShortText } from '../../types/formSchema.ts';

interface ShortTextFieldProps {
  field: FormFieldShortText;
}

function ShortTextField({ field }: ShortTextFieldProps) {
  return (
    <div>
      <span>
        {field.id} {field.type}
      </span>
    </div>
  );
}

export default ShortTextField;
