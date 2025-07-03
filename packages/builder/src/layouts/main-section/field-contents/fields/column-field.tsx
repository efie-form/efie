import type { ColumnFormField } from '@efie-form/core';
import RenderField from '../render-field';

interface ColumnsFieldProps {
  field: ColumnFormField;
}

function ColumnsField({ field }: ColumnsFieldProps) {
  const hasChildren = field.children.length > 0;

  return (
    <>
      {hasChildren && (
        <div>
          {field.children.map((child, index) => (
            <RenderField
              key={`${field.id}-${child.id}`}
              field={child}
              parentId={field.id}
              childIndex={index}
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
    </>
  );
}

export default ColumnsField;
