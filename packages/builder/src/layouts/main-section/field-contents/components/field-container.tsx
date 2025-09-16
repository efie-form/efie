import type { FormField } from '@efie-form/core';
import { FieldType } from '@efie-form/core';
import type { MouseEvent } from 'react';
import { cn } from '../../../../lib/utils';

interface FieldContainerProps {
  field: FormField;
  isSelected: boolean;
  isDraggedOver: boolean;
  noSelect?: boolean;
  onSelectField?: (e: MouseEvent) => void;
  children?: React.ReactNode;
}

export function FieldContainer({
  field,
  isSelected,
  isDraggedOver,
  noSelect,
  onSelectField,
  children,
}: FieldContainerProps) {
  return (
    <div
      key={field.sys.id}
      data-field="true"
      id={`field-container-${field.sys.id}`}
      className={cn(
        '-outline-offset-2 relative h-full transform rounded-md rounded-br-none p-1 outline-solid outline-2 outline-[#00000000]',
        {
          'outline-primary! relative z-50': isSelected,
          '[&:not(:has(div[data-field=true]:hover))]:hover:outline-neutral-100':
            field.sys.type !== FieldType.COLUMN,
          'z-100': isDraggedOver,
        },
      )}
      {...(!noSelect &&
        onSelectField && {
          onClick: onSelectField,
        })}
    >
      {children}
    </div>
  );
}
