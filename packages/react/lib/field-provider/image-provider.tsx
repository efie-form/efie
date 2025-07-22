import { type ImageFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ImageFieldProps } from '../../types/field-props';

interface ImageProviderProps {
  field: ImageFormField;
  Component?: ElementType<ImageFieldProps>;
}

function ImageProvider({ field, Component }: ImageProviderProps) {
  if (!Component) return <></>;

  const src = field.props.find((prop) => prop.type === PropertyType.SRC);
  const alt = field.props.find((prop) => prop.type === PropertyType.ALT);

  return createElement(Component, {
    id: field.id,
    field,
    src: src?.value || '',
    alt: alt?.value || '',
  });
}

export default ImageProvider;
