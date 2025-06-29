import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DividerFieldProps } from '../../types/field-props';
import { PropertyType, type DividerFormField } from '@efie-form/core';

interface DividerProviderProps {
  field: DividerFormField;
  Component?: ElementType<DividerFieldProps>;
}

function DividerProvider({ field, Component }: DividerProviderProps) {
  if (!Component) return <></>;

  const width = field.props.find(prop => prop.type === PropertyType.WIDTH);
  const color = field.props.find(prop => prop.type === PropertyType.COLOR);
  const style = field.props.find(prop => prop.type === PropertyType.BORDER_STYLE);

  // Extract width value
  let widthValue = 100;
  if (width?.value && typeof width.value === 'object' && 'type' in width.value) {
    if (width.value.type === 'percentage' && 'value' in width.value) {
      widthValue = typeof width.value.value === 'number' ? width.value.value : 100;
    }
    else if (width.value.type === 'length' && 'value' in width.value) {
      widthValue = typeof width.value.value === 'number' ? width.value.value : 1;
    }
  }

  // Extract color value
  const colorValue = typeof color?.value === 'string' ? color.value : '#000000';

  return createElement(Component, {
    id: field.id,
    fieldId: field.id,
    field,
    style: {},
    // Field-specific props
    dividerWidth: widthValue,
    dividerColor: colorValue,
    dividerStyle: (typeof style?.value === 'string' ? style?.value : 'solid') as 'solid' | 'dashed' | 'dotted',
  } satisfies DividerFieldProps);
}

export default DividerProvider;
