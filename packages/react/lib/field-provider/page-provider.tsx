import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FieldProps, FieldPropsMap } from '../../types/field-props';
import { PropertyType, type PageFormField } from '@efie-form/core';
import RenderField from '../render-field';
import { useFormContext } from '../form-context';

interface PageProviderProps extends Partial<FieldPropsMap> {
  field: PageFormField;
  Component?: ElementType<FieldProps<'page'>>;
}

function PageProvider({ field, Component, ...props }: PageProviderProps) {
  const { page } = useFormContext();
  if (!Component || page !== field.id) return <></>;

  const pageName = field.props.find(prop => prop.type === PropertyType.PAGE_NAME);

  return createElement(Component, {
    id: field.id,
    field: field,
    pageName: (typeof pageName?.value === 'string' ? pageName.value : '') || '',
    style: {},
    children: (
      <>
        {field.children.map(field => (
          <RenderField key={field.id} field={field} {...props} />
        ))}
      </>
    ),
  });
}

export default PageProvider;
