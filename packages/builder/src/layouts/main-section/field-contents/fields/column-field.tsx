import type { ColumnFormField } from '@efie-form/core';
import EmptyArea from '../../empty-area';
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
              key={`${field.sys.id}-${child.id}`}
              parentId={field.sys.id}
              fieldId={child.id}
              childIndex={index}
            />
          ))}
        </div>
      )}
      {!hasChildren && (
        <div className="p-2">
          <EmptyArea parentId={field.sys.id} />
        </div>
      )}
    </>
  );
}

export default ColumnsField;
