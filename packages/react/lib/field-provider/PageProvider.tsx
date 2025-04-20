import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FieldPropsMap, PageFieldProps } from '../../types/FieldProps';
import { type PageFormField } from '@efie-form/core';
import RenderField from '../RenderField';

interface PageProviderProps extends Partial<FieldPropsMap> {
  field: PageFormField;
  Component?: ElementType<PageFieldProps>;
}

function PageProvider({ field, Component, ...props }: PageProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
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
