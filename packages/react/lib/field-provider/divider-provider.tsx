import type { DividerFormField } from '@efie-form/core';
import type { ElementType, ReactElement } from 'react';
import { createElement } from 'react';
import type { DividerFieldProps } from '../../types/field-props';
import { useFieldCondition } from '../hooks/use-field-condition';

interface DividerProviderProps {
  field: DividerFormField;
  Component?: ElementType<DividerFieldProps>;
}

function DividerProvider({ field, Component }: DividerProviderProps): ReactElement | null {
  const { isVisible, isHidden } = useFieldCondition(field.id);

  if (!Component) return null;

  // Check if field should be visible
  if (!isVisible) {
    return null;
  }

  return createElement(Component, {
    id: field.id,
    field,
    hidden: isHidden,
  } satisfies DividerFieldProps);
}

export default DividerProvider;
