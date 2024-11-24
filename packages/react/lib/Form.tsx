import React, { Fragment } from 'react';
import type { FormSchema } from '@efie-form/core';
import RenderField from './RenderField';
import type { FieldPropsMap } from '../types/FieldProps';

interface ReactFormProps extends Partial<FieldPropsMap> {
  schema: FormSchema;
}

function ReactForm({ schema, container, ...props }: ReactFormProps) {
  const Container = container || Fragment;

  return (
    <div>
      <Container>
        {schema.form.fields.map((field) => (
          <Fragment key={field.id}>
            <RenderField field={field} {...props} />
          </Fragment>
        ))}
      </Container>
    </div>
  );
}

export default ReactForm;
