import type { FormFieldColumn } from '@efie-form/core';
import RenderField from '../RenderField.tsx';

import type { FieldKeyPrefix } from '../../../../lib/genFieldKey.ts';
import genFieldKey from '../../../../lib/genFieldKey.ts';
import Droppable from '../../../../components/dnd-kit/Droppable.tsx';
import { useFieldArray } from 'react-hook-form';

interface ColumnsFieldProps {
  field: FormFieldColumn;
  fieldKey: FieldKeyPrefix;
}

function ColumnsField({ field, fieldKey }: ColumnsFieldProps) {
  const hasChildren = field.children.length > 0;
  const { remove } = useFieldArray({
    name: `${fieldKey}.children`,
  });

  return (
    <Droppable id={field.id} type={field.type} className="h-full">
      {hasChildren && (
        <div>
          {field.children.map((child, index) => (
            <RenderField
              key={`${field.id}-${child.id}`}
              field={child}
              fieldKey={genFieldKey(fieldKey, `children.${index}`)}
              onRemove={() => {
                remove(index);
              }}
            />
          ))}
        </div>
      )}
      {!hasChildren && (
        <div className="h-full p-2">
          {field.children.length === 0 && (
            <div className="h-full px-4 flex justify-center typography-body3 items-center min-h-32 bg-neutral-50 rounded-md text-center">
              Drag and drop fields here
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
}

export default ColumnsField;
