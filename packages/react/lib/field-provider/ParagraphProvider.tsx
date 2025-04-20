import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ParagraphFieldProps } from '../../types/FieldProps';
import { PropertyType, type ParagraphFormField } from '@efie-form/core';

interface ParagraphProviderProps {
  field: ParagraphFormField;
  Component?: ElementType<ParagraphFieldProps>;
}

function ParagraphProvider({ field, Component }: ParagraphProviderProps) {
  if (!Component) return <></>;

  const content = field.props.find(prop => prop.type === PropertyType.CONTENT);
  const textAlign = field.props.find(prop => prop.type === PropertyType.TEXT_ALIGN);
  const fontSize = field.props.find(prop => prop.type === PropertyType.FONT_SIZE);
  const fontWeight = field.props.find(prop => prop.type === PropertyType.FONT_WEIGHT);

  return createElement(Component, {
    id: field.id,
    text: typeof content?.value?.content === 'string' ? content?.value?.content : 'Paragraph',
    textAlign: textAlign?.value || 'left',
    font: {
      size: fontSize?.value?.value || 16,
      weight: fontWeight?.value || 400,
      unit: (fontSize?.value?.unit === 'px' || fontSize?.value?.unit === 'em' || fontSize?.value?.unit === 'rem') ? fontSize?.value?.unit : 'px',
    },
  });
}

export default ParagraphProvider;
