import { type ColumnFormField, PropertyType, sizeToStyle } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ColumnFieldProps, FieldPropsMap } from '../../types/field-props';
import RenderField from '../render-field';

interface ColumnProviderProps extends Partial<FieldPropsMap> {
  field: ColumnFormField;
  Component?: ElementType<ColumnFieldProps>;
}

function ColumnProvider({ field, Component, ...props }: ColumnProviderProps) {
  if (!Component) return null;

  const width = field.props.find((prop) => prop.type === PropertyType.COLUMN_WIDTH);

  // Extract width value safely
  const columnWidth = sizeToStyle(width?.value);

  const children = (
    <>
      {field.children.map((field) => (
        <div key={field.sys.id}>
          <RenderField field={field} {...props} />
        </div>
      ))}
    </>
  );

  return createElement(
    Component,
    {
      id: field.sys.id,
      field,
      width: columnWidth || '100%',
    },
    children,
  );
}

export default ColumnProvider;
