import type { BlockFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { BlockFieldProps, FieldPropsMap } from '../../types/field-props';
import RenderField from '../render-field';

interface BlockProviderProps extends Partial<FieldPropsMap> {
  field: BlockFormField;
  Component?: ElementType<BlockFieldProps>;
}

function BlockProvider({ field, Component, ...props }: BlockProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    field,
    children: (
      <>
        {field.children.map((field) => (
          <RenderField key={field.id} field={field} {...props} />
        ))}
      </>
    ),
  } satisfies BlockFieldProps);
}

export default BlockProvider;
