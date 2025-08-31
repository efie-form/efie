import type { DividerFormField } from '@efie-form/core';
import type { ElementType, ReactElement } from 'react';
import { createElement } from 'react';
import type { DividerFieldProps } from '../../types/field-props';

interface DividerProviderProps {
  field: DividerFormField;
  Component?: ElementType<DividerFieldProps>;
}

function DividerProvider({ field, Component }: DividerProviderProps): ReactElement | null {
  if (!Component) return null;

  return createElement(Component, {
    id: field.id,
    field,
    hidden: false,
  } satisfies DividerFieldProps);
}

export default DividerProvider;
