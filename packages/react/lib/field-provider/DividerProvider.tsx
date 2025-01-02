import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DividerFieldProps } from '../../types/FieldProps';
import type { FormFieldDivider } from '@efie-form/core';

interface DividerProviderProps {
  field: FormFieldDivider;
  Component?: ElementType<DividerFieldProps>;
}

function DividerProvider({ field, Component }: DividerProviderProps) {
  if (!Component) return null;

  return createElement(Component, {
    id: field.id,
    width: field.props.width,
    color: field.props.color,
    style: field.props.style,
  });
}

export default DividerProvider;
