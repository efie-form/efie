import type { RowFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FieldPropsMap, RowFieldProps } from '../../types/field-props';
import RenderField from '../render-field';

interface RowProviderProps extends Partial<FieldPropsMap> {
  field: RowFormField;
  Component?: ElementType<RowFieldProps>;
}

function RowProvider({ field, Component, ...props }: RowProviderProps) {
  if (!Component) return <></>;

  return createElement(
    Component,
    {
      id: field.id,
      field,
    },
    field.children.map((field) => <RenderField key={field.id} field={field} {...props} />),
  );
}

export default RowProvider;
