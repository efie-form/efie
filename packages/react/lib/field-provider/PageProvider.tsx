import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { FieldPropsMap, PageFieldProps } from '../../types/FieldProps';
import type { FormFieldPage } from '@efie-form/core';
import RenderField from '../RenderField';

interface PageProviderProps extends Partial<FieldPropsMap> {
  field: FormFieldPage;
  Component?: ElementType<PageFieldProps>;
}

function PageProvider({ field, Component, ...props }: PageProviderProps) {
  if (!Component) return null;

  return createElement(Component, {
    id: field.id,
    children: (
      <>
        {field.children.map((field) => (
          <RenderField key={field.id} field={field} {...props} />
        ))}
      </>
    ),
  });
}

export default PageProvider;
