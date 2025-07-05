import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DividerFieldProps } from '../../types/field-props';
import { type DividerFormField } from '@efie-form/core';

interface DividerProviderProps {
  field: DividerFormField;
  Component?: ElementType<DividerFieldProps>;
}

function DividerProvider({ field, Component }: DividerProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    field,
  } satisfies DividerFieldProps);
}

export default DividerProvider;
