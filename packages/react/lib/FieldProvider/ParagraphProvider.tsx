import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ParagraphFieldProps } from '../../types/FieldProps';
import type { FormFieldParagraph } from '@efie-form/core';

interface ParagraphProviderProps {
  field: FormFieldParagraph;
  Component?: ElementType<ParagraphFieldProps>;
}

function ParagraphProvider({ field, Component }: ParagraphProviderProps) {
  if (!Component) return null;

  return createElement(Component, {
    id: field.id,
    text: field.props.text,
    textAlign: field.props.textAlign,
    font: {
      size: field.props.font.size,
      weight: field.props.font.weight,
      unit: field.props.font.unit,
    },
  });
}

export default ParagraphProvider;
