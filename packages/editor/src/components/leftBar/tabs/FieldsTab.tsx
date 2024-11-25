import { fieldGroup } from '../../../lib/fields.ts';
import { cn } from '../../../lib/utils.ts';
import { useDndStore } from '../../../lib/state/dnd.state.ts';

function FieldsTab() {
  const { setDraggedType } = useDndStore();

  return (
    <div className="px-4 py-2">
      {fieldGroup.map((group) => (
        <div key={group.id} className="mb-4">
          <p className="text-neutral-700 text-lg">{group.label}</p>
          <div className="flex flex-col gap-1.5 mt-3">
            {group.children.map((field) => (
              <div
                key={field.type}
                className={cn(
                  'flex items-center gap-2 px-4 transform py-1.5 bg-neutral-100/30 border border-neutral-100/30 border-opacity-0 cursor-grab rounded-md text-neutral-800',
                  'hover:border-primary-400 hover:bg-primary-100 hover:bg-neutral-100/70 hover:text-primary'
                )}
                draggable
                onDragStart={() => {
                  setDraggedType(field.type);
                }}
              >
                <field.Icon />
                <span className="text-sm">{field.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FieldsTab;
