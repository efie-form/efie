import type { FormFieldRow } from '@efie-form/core';
import RenderField from '../RenderField.tsx';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import genFieldKey from '../../lib/genFieldKey.ts';
import { useSettingsStore } from '../../lib/state/settings.state.ts';
import { cn } from '../../lib/utils.ts';

interface RowFieldProps {
  field: FormFieldRow;
  fieldKey: FieldKeyPrefix;
}

function RowField({ field, fieldKey }: RowFieldProps) {
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
        .map((child, index) => (
          <div
            key={`${field.id}-${child.id}`}
            style={{
              width: isMobile ? '100%' : `${child.props.width}%`,
            }}
            className="self-stretch"
          >
            <RenderField
              field={child}
              noSelect
              fieldKey={genFieldKey(fieldKey, `children.${index}`)}
            />
          </div>
        ))}
    </div>
  );
}

export default RowField;
