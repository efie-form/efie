import { fieldGroup } from '../../../lib/fields.ts';
import useNewField from '../../../lib/hooks/useNewField.ts';
import { cn } from '../../../lib/utils.ts';

function FieldsTab() {
  const { registerProps } = useNewField();

  return (
    <div className="px-4 py-2">
      {fieldGroup.map((group) => (
        <div className="mb-4">
          <p className="text-neutral-700 text-lg">{group.label}</p>
          <div className="flex flex-col gap-1.5 mt-3">
            {group.children.map((field) => (
              <div
                key={field.type}
                className={cn(
                  'flex items-center gap-2 px-4 transform py-1.5 bg-neutral-100/30 border border-neutral-100/30 border-opacity-0 cursor-grab rounded-md text-neutral-800',
                  'hover:border-primary-400 hover:bg-primary-100 hover:bg-neutral-100/70 hover:text-primary'
                )}
                {...registerProps(field.type)}
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
