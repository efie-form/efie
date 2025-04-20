import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ColumnFieldProps, FieldPropsMap } from '../../types/FieldProps';
import { PropertyType, type ColumnFormField } from '@efie-form/core';
import RenderField from '../RenderField';

interface ColumnProviderProps extends Partial<FieldPropsMap> {
  field: ColumnFormField;
  Component?: ElementType<ColumnFieldProps>;
}

function ColumnProvider({ field, Component, ...props }: ColumnProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    children: (
      <>
        {field.children.map(field => (
          <div key={field.id}>
            <RenderField field={field} {...props} />
          </div>
        ))}
      </>
    ),
    columnWidth: `${field.props.find(prop => prop.type === PropertyType.WIDTH)?.value?.value || 100}%`,
  });
}

export default ColumnProvider;
