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

  // Extract width value safely
  let imageWidth = 'auto';
  if (width?.value && typeof width.value === 'object' && 'value' in width.value) {
    const unit = 'unit' in width.value ? width.value.unit : '%';
    imageWidth = `${width.value.value || 100}${unit}`;
  }

  return createElement(Component, {
    id: field.id,
    fieldId: field.id,
    field,
    src: src?.value || '',
    alt: alt?.value || '',
    objectFit: (objectFit?.value as 'fill' | 'contain' | 'cover' | 'none' | 'scale-down') || 'contain',
    textAlign: (textAlign?.value as 'left' | 'center' | 'right') || 'center',
    imageWidth,
    imageHeight: 'auto',
    style: {},
  });
}

export default ImageProvider;
