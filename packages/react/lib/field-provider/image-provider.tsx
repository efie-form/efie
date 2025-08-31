import { type ImageFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ImageFieldProps } from '../../types/field-props';

interface ImageProviderProps {
  field: ImageFormField;
  Component?: ElementType<ImageFieldProps>;
}

function ImageProvider({ field, Component }: ImageProviderProps) {
  if (!Component) return null;

  const src = field.props.find((prop) => prop.type === PropertyType.IMAGE_SRC);

  return createElement(Component, {
    id: field.id,
    field,
    src: src?.value || '',
  });
}

export default ImageProvider;
