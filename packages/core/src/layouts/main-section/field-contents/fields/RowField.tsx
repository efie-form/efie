import type { FormFieldRow } from '../../../../../../core-old';
import RenderField from '../RenderField.tsx';
import { useSettingsStore } from '../../../../lib/state/settings.state.ts';
import { cn } from '../../../../lib/utils.ts';

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
        .filter((child) => child.type === 'column')
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
