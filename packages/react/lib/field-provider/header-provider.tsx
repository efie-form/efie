import type { ElementType } from 'react';
import { createElement } from 'react';
import type { HeaderFieldProps } from '../../types/field-props';
import { PropertyType, type HeaderFormField } from '@efie-form/core';

interface HeaderProviderProps {
  field: HeaderFormField;
  Component?: ElementType<HeaderFieldProps>;
}

function HeaderProvider({ field, Component }: HeaderProviderProps) {
  if (!Component) return <></>;

  const content = field.props.find(prop => prop.type === PropertyType.CONTENT);

  // Extract content from the rich text format
  let contentText = 'Header';
  if (content?.value?.jsonContent) {
    try {
      contentText = JSON.stringify(content.value.jsonContent);
    }
    catch {
      contentText = 'Header';
    }
  }

  return createElement(Component, {
    id: field.id,
    field,
    content: contentText,
  });
}

export default HeaderProvider;
