import type { RowFormField } from '@efie-form/core';
import RenderField from '../render-field';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { cn, getFieldProp } from '../../../../lib/utils';
import { FieldType, PropertyType, widthToStyle } from '@efie-form/core';

interface RowFieldProps {
  field: RowFormField;
}

function RowField({ field }: RowFieldProps) {
  const { previewDevice } = useSettingsStore();

  const isMobile = previewDevice === 'mobile';

  return (
    <div
      className={cn('flex relative items-start content-start p-2', {
        'flex-col': isMobile,
      })}
    >
      {field.children
        .filter(Boolean)
        .filter(child => child.type === FieldType.COLUMN)
        .map((child, index) => (
          <div
            key={`${field.id}-${child.id}`}
            style={{
              width: isMobile
                ? '100%'
                : widthToStyle(getFieldProp(child, PropertyType.COLUMN_WIDTH)?.value),
            }}
            className="self-stretch"
          >
            <RenderField
              field={child}
              noSelect
              parentId={field.id}
              childIndex={index}
            />
          </div>
        ))}
    </div>
  );
}

export default RowField;
