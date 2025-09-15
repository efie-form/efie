import type { RowFormField } from '@efie-form/core';
import { FieldType, PropertyType, widthToStyle } from '@efie-form/core';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { cn, getFieldProp } from '../../../../lib/utils';
import RenderField from '../render-field';

interface RowFieldProps {
  field: RowFormField;
}

function RowField({ field }: RowFieldProps) {
  const { previewDevice } = useSettingsStore();

  const isMobile = previewDevice === 'mobile';

  return (
    <div
      className={cn('relative flex content-start items-start p-2', {
        'flex-col': isMobile,
      })}
    >
      {field.children
        .filter(Boolean)
        .filter((child) => child.sys.type === FieldType.COLUMN)
        .map((child, index) => (
          <div
            key={`${field.sys.id}-${child.sys.id}`}
            style={{
              width: isMobile
                ? '100%'
                : widthToStyle(getFieldProp(child, PropertyType.COLUMN_WIDTH)?.value),
            }}
            className="self-stretch"
          >
            <RenderField
              fieldId={child.sys.id}
              noSelect
              parentId={field.sys.id}
              childIndex={index}
            />
          </div>
        ))}
    </div>
  );
}

export default RowField;
