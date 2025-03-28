import type { ColumnFormField } from '@efie-form/core';
import RenderField from '../RenderField';
import Droppable from '../../../../components/dnd-kit/Droppable';

interface ColumnsFieldProps {
  field: ColumnFormField;
}

function ColumnsField({ field }: ColumnsFieldProps) {
  const hasChildren = field.children.length > 0;

  return (
    <Droppable id={field.id} type={field.type} className="h-full">
      {hasChildren && (
        <div>
          {field.children.map((child) => (
            <RenderField key={`${field.id}-${child.id}`} field={child} />
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
