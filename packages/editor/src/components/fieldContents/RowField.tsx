import type { FormFieldRow } from '@efie-form/core';
import RenderField from '../RenderField.tsx';

interface RowFieldProps {
  field: FormFieldRow;
}

function RowField({ field }: RowFieldProps) {
  return (
    <div className="flex">
      {field.children
        .filter((child) => child.type === 'column')
        .map((child) => (
          <div
            key={`${field.id}-${child.id}`}
            style={{
              width: `${child.props.width}%`,
            }}
          >
            <RenderField field={child} noSelect />
          </div>
        ))}
    </div>
  );
}

export default RowField;
