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
  const tag = field.props.find(prop => prop.type === PropertyType.TAG);
  const textAlign = field.props.find(prop => prop.type === PropertyType.TEXT_ALIGN);
  const fontSize = field.props.find(prop => prop.type === PropertyType.FONT_SIZE);

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

  // Extract font size value - simplified approach
  let fontSizeValue = 24;
  let fontUnit: 'px' | 'em' | 'rem' = 'px';
  if (fontSize?.value && typeof fontSize.value === 'object' && 'type' in fontSize.value && fontSize.value.type === 'length' && 'value' in fontSize.value && 'unit' in fontSize.value) {
    fontSizeValue = typeof fontSize.value.value === 'number' ? fontSize.value.value : 24;
    fontUnit = fontSize.value.unit === 'em' || fontSize.value.unit === 'rem'
      ? fontSize.value.unit
      : 'px';
  }

  // Ensure textAlign is one of the valid values
  const validTextAlign = textAlign?.value === 'center' || textAlign?.value === 'right'
    ? textAlign.value
    : 'left';

  return createElement(Component, {
    id: field.id,
    fieldId: field.id,
    field,
    style: {},
    // Field-specific props
    content: contentText,
    headingTag: tag?.value || 'h1',
    textAlign: validTextAlign,
    font: {
      size: fontSizeValue,
      weight: 400,
      unit: fontUnit,
    },
  } satisfies HeaderFieldProps);
}

export default HeaderProvider;
