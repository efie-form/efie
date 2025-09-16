import type { GroupFormField } from '@efie-form/core';
import EmptyArea from '../../empty-area';
import RenderField from '../render-field';

interface GroupFieldProps {
  field: GroupFormField;
}

function GroupField({ field }: GroupFieldProps) {
  return (
    <div className="relative min-h-20 w-full rounded-lg border border-dashed border-neutral-300 p-4">
      {field.children.map((child, index) => (
        <RenderField
          fieldId={child.sys.id}
          key={child.sys.id}
          parentId={field.sys.id}
          childIndex={index}
        />
      ))}
      {field.children.length === 0 && <EmptyArea parentId={field.sys.id} />}
    </div>
  );
}

export default GroupField;
