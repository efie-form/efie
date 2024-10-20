import type { FormFieldDivider } from '../../types/formSchema.ts';

interface DividerFieldProps {
  field: FormFieldDivider;
}

function DividerField({ field }: DividerFieldProps) {
  return (
    <div>
      <hr
        className="my-4 mx-auto"
        style={{
          width: `${field.props.width}%`,
          borderStyle: field.props.style,
          borderColor: field.props.color,
        }}
      />
    </div>
  );
}

export default DividerField;
