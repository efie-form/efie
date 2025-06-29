import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ImageFieldProps } from '../../types/field-props';
import { PropertyType, type ImageFormField } from '@efie-form/core';

interface ImageProviderProps {
  field: ImageFormField;
  Component?: ElementType<ImageFieldProps>;
}

function ImageProvider({ field, Component }: ImageProviderProps) {
  if (!Component) return <></>;

  const src = field.props.find(prop => prop.type === PropertyType.SRC);
  const alt = field.props.find(prop => prop.type === PropertyType.ALT);

  return createElement(Component, {
    id: field.id,
    fieldId: field.id,
    field,
    src: src?.value || '',
    alt: alt?.value || '',
    style: {},
  });
}

export default ImageProvider;
