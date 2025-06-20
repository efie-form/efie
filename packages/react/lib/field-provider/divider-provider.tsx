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
  const style = field.props.find(prop => prop.type === PropertyType.STYLE);

  return createElement(Component, {
    id: field.id,
    dividerWidth: width?.value?.value || 100,
    dividerColor: color?.value || '#000000',
    dividerStyle: (typeof style?.value === 'string' ? style?.value : 'solid') as 'solid' | 'dashed' | 'dotted',
  });
}

export default DividerProvider;
