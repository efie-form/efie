import type { FormFieldDivider } from '@efie-form/core';

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
          borderTopWidth: `${field.props.height}px`,
        }}
      />
    </div>
  );
}

export default DividerField;
