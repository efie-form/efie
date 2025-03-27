import type { LayoutFormField } from '@efie-form/core';
import RenderField from '../RenderField';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { cn, getFieldProp } from '../../../../lib/utils';
import { FormFieldType, PropertyType, widthToStyle } from '@efie-form/core';

interface RowFieldProps {
  field: LayoutFormField;
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
              width: isMobile
                ? '100%'
                : widthToStyle(getFieldProp(child, PropertyType.WIDTH)),
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
