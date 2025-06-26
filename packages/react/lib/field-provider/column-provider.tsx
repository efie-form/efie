import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ColumnFieldProps, FieldPropsMap } from '../../types/field-props';
import { PropertyType, type ColumnFormField } from '@efie-form/core';
import RenderField from '../render-field';

interface ColumnProviderProps extends Partial<FieldPropsMap> {
  field: ColumnFormField;
  Component?: ElementType<ColumnFieldProps>;
}

function ColumnProvider({ field, Component, ...props }: ColumnProviderProps) {
  if (!Component) return <></>;

  const width = field.props.find(prop => prop.type === PropertyType.WIDTH);

  // Extract width value safely
  let columnWidth = '100%';
  if (width?.value && typeof width.value === 'object' && 'value' in width.value) {
    const unit = 'unit' in width.value ? width.value.unit : '%';
    columnWidth = `${width.value.value || 100}${unit}`;
  }

  return createElement(Component, {
    id: field.id,
    fieldId: field.id,
    field,
    columnWidth,
    gap: undefined,
    justifyContent: undefined,
    alignItems: undefined,
    style: {},
    children: (
      <>
        {field.children.map(field => (
          <div key={field.id}>
            <RenderField field={field} {...props} />
          </div>
        ))}
      </>
    ),
  });
}

export default ColumnProvider;
