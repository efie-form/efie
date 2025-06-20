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
  const objectFit = field.props.find(prop => prop.type === PropertyType.OBJECT_FIT);
  const textAlign = field.props.find(prop => prop.type === PropertyType.TEXT_ALIGN);
  const width = field.props.find(prop => prop.type === PropertyType.WIDTH);
  const autoWidth = field.props.find(prop => prop.type === PropertyType.AUTO_WIDTH);

  return createElement(Component, {
    id: field.id,
    src: src?.value || '',
    alt: alt?.value || '',
    objectFit: objectFit?.value || 'contain',
    textAlign: textAlign?.value || 'center',
    imageWidth: autoWidth?.value ? 'auto' : `${width?.value?.value || 100}%`,
    imageHeight: 'auto',
  });
}

export default ImageProvider;
