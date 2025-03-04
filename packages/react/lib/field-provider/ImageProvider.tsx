import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { ImageFieldProps } from '../../types/FieldProps';
import type { FormFieldImage } from '@efie-form/core';

interface ImageProviderProps {
  field: FormFieldImage;
  Component?: ElementType<ImageFieldProps>;
}

function ImageProvider({ field, Component }: ImageProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    src: field.props.src,
    alt: field.props.alt,
    objectFit: field.props.objectFit,
    textAlign: field.props.textAlign,
    width: field.props.width.autoWidth ? 'auto' : `${field.props.width.value}%`,
    height: 'auto',
  });
}

export default ImageProvider;
