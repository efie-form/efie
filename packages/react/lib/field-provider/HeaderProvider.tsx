import type { ElementType } from 'react';
import { createElement } from 'react';
import type { HeaderFieldProps } from '../../types/FieldProps';
import { PropertyType, type HeaderFormField } from '@efie-form/core';

interface HeaderProviderProps {
  field: HeaderFormField;
  Component?: ElementType<HeaderFieldProps>;
}

function HeaderProvider({ field, Component }: HeaderProviderProps) {
  if (!Component) return <></>;

  const content = field.props.find(prop => prop.type === PropertyType.CONTENT);
  const tag = field.props.find(prop => prop.type === PropertyType.TAG);
  const textAlign = field.props.find(prop => prop.type === PropertyType.TEXT_ALIGN);
  const fontSize = field.props.find(prop => prop.type === PropertyType.FONT_SIZE);
  const fontWeight = field.props.find(prop => prop.type === PropertyType.FONT_WEIGHT);

  return createElement(Component, {
    id: field.id,
    text: typeof content?.value?.content === 'string' ? content?.value?.content : 'Header',
    headingTag: tag?.value || 'h1',
    textAlign: textAlign?.value || 'left',
    font: {
      size: fontSize?.value?.value || 16,
      weight: fontWeight?.value || 400,
      unit: (fontSize?.value?.unit === 'px' || fontSize?.value?.unit === 'em' || fontSize?.value?.unit === 'rem') ? fontSize?.value?.unit : 'px',
    },
  });
}

export default HeaderProvider;
