import type { FormFieldRow } from '@efie-form/core';
import RenderField from '../RenderField';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { cn } from '../../../../lib/utils';
import { FormFieldType } from '@efie-form/core';

interface RowFieldProps {
  field: FormFieldRow;
}

function RowField({ field }: RowFieldProps) {
  const { previewDevice } = useSettingsStore();
  const isMobile = previewDevice === 'mobile';

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
