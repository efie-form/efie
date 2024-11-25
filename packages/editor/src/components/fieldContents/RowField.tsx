import type { FormFieldRow } from '@efie-form/core';
import RenderField from '../RenderField.tsx';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';

interface RowFieldProps {
  field: FormFieldRow;
  fieldKey: FieldKeyPrefix;
}

function RowField({ field, fieldKey }: RowFieldProps) {
  return (
    <div className="flex">
      {field.children
        .filter((child) => child.type === 'column')
        .map((child, index) => (
          <div
            key={`${field.id}-${child.id}`}
            style={{
              width: `${child.props.width}%`,
            }}
          >
            <RenderField
              field={child}
              noSelect
              fieldKey={`${fieldKey}.children.${index}`}
            />
          </div>
        ))}
    </div>
  );
}

export default RowField;
