import { Fragment } from 'react';
import type { FormSchema } from '@efie-form/core';
import RenderField from './render-field';
import type { FieldPropsMap } from '../types/field-props';

interface ReactFormProps extends Partial<FieldPropsMap> {
  schema: FormSchema;
}

function ReactForm({ schema, ...props }: ReactFormProps) {
  return (
    <div>
      {schema.form.fields.map(field => (
        <Fragment key={field.id}>
          <RenderField field={field} {...props} />
        </Fragment>
      ))}
    </div>
  );
}

export default ReactForm;
