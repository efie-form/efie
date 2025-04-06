import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ColumnFieldProps, FieldPropsMap } from '../../types/FieldProps';
import type { FormFieldColumn } from '@efie-form/core';
import RenderField from '../RenderField';

interface ColumnProviderProps extends Partial<FieldPropsMap> {
  field: FormFieldColumn;
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
    width: `${field.props.width}%`,
  });
}

export default ColumnProvider;
