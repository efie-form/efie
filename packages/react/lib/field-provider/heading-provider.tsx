import type { ElementType } from 'react';
import { createElement } from 'react';
import type { HeadingFieldProps } from '../../types/field-props';
import { PropertyType, type HeadingFormField } from '@efie-form/core';

interface HeadingProviderProps {
  field: HeadingFormField;
  Component?: ElementType<HeadingFieldProps>;
}

function HeadingProvider({ field, Component }: HeadingProviderProps) {
  if (!Component) return <></>;

  const content = field.props.find(prop => prop.type === PropertyType.CONTENT);

  // Extract content from the rich text format
  let contentText = 'Heading';
  if (content?.value?.jsonContent) {
    try {
      contentText = JSON.stringify(content.value.jsonContent);
    }
    catch {
      contentText = 'Heading';
    }
  }

  return createElement(Component, {
    id: field.id,
    field,
    content: contentText,
  });
}

export default HeadingProvider;
