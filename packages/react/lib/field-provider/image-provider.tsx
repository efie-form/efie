import { type ImageFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ImageFieldProps } from '../../types/field-props';
import { useFieldCondition } from '../hooks/use-field-condition';

interface ImageProviderProps {
  field: ImageFormField;
  Component?: ElementType<ImageFieldProps>;
}

function ImageProvider({ field, Component }: ImageProviderProps) {
  const { isVisible } = useFieldCondition(field.id);

  if (!Component) return null;

  // Check if field should be visible
  if (!isVisible) {
    return null;
  }

  const src = field.props.find(
    (prop): prop is { type: typeof PropertyType.IMAGE_SRC; value: string } =>
      prop.type === PropertyType.IMAGE_SRC,
  );

  return createElement(Component, {
    id: field.id,
    field,
    src: src?.value || '',
  });
}

export default ImageProvider;
