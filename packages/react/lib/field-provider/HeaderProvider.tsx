import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { HeaderFieldProps } from '../../types/FieldProps';
import type { FormFieldHeader } from '../../../core-old';

interface HeaderProviderProps {
  field: FormFieldHeader;
  Component?: ElementType<HeaderFieldProps>;
}

function HeaderProvider({ field, Component }: HeaderProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    text: field.props.text,
    tag: field.props.tag,
    textAlign: field.props.textAlign,
    font: {
      size: field.props.font.size,
      weight: field.props.font.weight,
      unit: field.props.font.unit,
    },
  });
}

export default HeaderProvider;
