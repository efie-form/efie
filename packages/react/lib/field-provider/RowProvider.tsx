import type { ElementType } from 'react';
import { createElement, Fragment } from 'react';
import type { FieldPropsMap, RowFieldProps } from '../../types/FieldProps';
import type { FormFieldRow } from '@efie-form/core';
import RenderField from '../RenderField';

interface RowProviderProps extends Partial<FieldPropsMap> {
  field: FormFieldRow;
  Component?: ElementType<RowFieldProps>;
}

function RowProvider({ field, Component, ...props }: RowProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    children: (
      <>
        {field.children.map(field => (
          <Fragment key={field.id}>
            <RenderField field={field} {...props} />
          </Fragment>
        ))}
      </>
    ),
  });
}

export default RowProvider;
