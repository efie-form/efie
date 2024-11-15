import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { BlockFieldProps } from '../../types/FieldProps';
import type { FormFieldBlock } from '@efie-form/core';

interface BlockProviderProps {
  field: FormFieldBlock;
  Component?: ElementType<BlockFieldProps>;
}

function BlockProvider({ field, Component }: BlockProviderProps) {
  if (!Component) return null;

  return createElement(Component, {
    id: field.id,
    children: <></>,
  });
}

export default BlockProvider;
