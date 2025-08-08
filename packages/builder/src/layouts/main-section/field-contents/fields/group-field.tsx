import type { GroupFormField } from '@efie-form/core';
import EmptyArea from '../../empty-area';
import RenderField from '../render-field';

interface GroupFieldProps {
  field: GroupFormField;
}

function GroupField({ field }: GroupFieldProps) {
  return (
    <div className="relative min-h-20 w-full rounded-lg bg-neutral-50 p-4 ring-1 ring-neutral-200">
      <div className="typography-body4 absolute -top-2 left-2 rounded bg-neutral-200 px-2 py-0.5 text-neutral-600">
        Group
      </div>
      {field.children.map((child, index) => (
        <RenderField field={child} key={child.id} parentId={field.id} childIndex={index} />
      ))}
      {field.children.length === 0 && <EmptyArea parentId={field.id} />}
    </div>
  );
}

export default GroupField;
