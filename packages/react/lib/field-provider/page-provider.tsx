import type { PageFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FieldProps, FieldPropsMap } from '../../types/field-props';
import { useFormContext } from '../form-context';
import RenderField from '../render-field';

interface PageProviderProps extends Partial<FieldPropsMap> {
  field: PageFormField;
  Component?: ElementType<FieldProps<'page'>>;
}

function PageProvider({ field, Component, ...props }: PageProviderProps) {
  const { page } = useFormContext();
  if (!Component || page !== field.id) return null;

  const children = (
    <>
      {field.children.map((f) => (
        <RenderField key={f.id} field={f} {...props} />
      ))}
    </>
  );

  return createElement(
    Component,
    {
      id: field.id,
      field: field,
      children,
    },
    children,
  );
}

export default PageProvider;
