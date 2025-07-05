import {
  type BlockFormField,
} from '@efie-form/core';
import RenderField from '../render-field';
import EmptyArea from '../../empty-area';

interface BlockFieldProps {
  field: BlockFormField;
}

function BlockField({ field }: BlockFieldProps) {
  return (
    <div
      className="min-h-20 w-full transition-all relative p-4 rounded-lg shadow-md bg-white"
    >
      {field.children.map((child, index) => (
        <RenderField
          field={child}
          key={child.id}
          parentId={field.id}
          childIndex={index}
        />
      ))}
      {field.children.length === 0 && (
        <EmptyArea
          parentId={field.id}
        />
      )}
    </div>
  );
}

export default BlockField;
