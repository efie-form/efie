import type { BlockFormField } from '@efie-form/core';
import EmptyArea from '../../empty-area';
import RenderField from '../render-field';

interface BlockFieldProps {
  field: BlockFormField;
}

function BlockField({ field }: BlockFieldProps) {
  return (
    <div className="relative min-h-20 w-full rounded-lg bg-white p-4 shadow-md transition-all">
      {field.children.map((child, index) => (
        <RenderField fieldId={child.id} key={child.id} parentId={field.id} childIndex={index} />
      ))}
      {field.children.length === 0 && <EmptyArea parentId={field.id} />}
    </div>
  );
}

export default BlockField;
