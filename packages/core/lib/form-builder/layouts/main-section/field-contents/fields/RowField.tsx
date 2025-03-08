import type { FormFieldRow } from '@lib/types/formSchema.type.ts';
import RenderField from '../RenderField';
import { useSettingsStore } from '@form-builder/lib/state/settings.state';
import { cn } from '@form-builder/lib/utils';
import { FormFieldType } from '@lib/InputType';

interface RowFieldProps {
  field: FormFieldRow;
}

function RowField({ field }: RowFieldProps) {
  const { mode } = useSettingsStore();
  const isMobile = mode === 'mobile';

  return (
    <div
      className={cn('flex relative items-start content-start', {
        'flex-col': isMobile,
      })}
    >
      {field.children
        .filter((child) => child.type === FormFieldType.COLUMN)
        .map((child) => (
          <div
            key={`${field.id}-${child.id}`}
            style={{
              width: isMobile ? '100%' : `${child.props.width}%`,
            }}
            className="self-stretch"
          >
            <RenderField field={child} noSelect />
          </div>
        ))}
    </div>
  );
}

export default RowField;
