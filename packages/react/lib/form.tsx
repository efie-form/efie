import type { FormSchema } from '@efie-form/core';
import { Fragment, useEffect, useState } from 'react';
import type { FieldPropsMap } from '../types/field-props';
import { FormProvider } from './components/form-provider';
import RenderField from './render-field';

interface ReactFormProps extends Partial<FieldPropsMap> {
  schema: FormSchema;
}

function ReactForm({ schema, ...props }: ReactFormProps) {
  const [page, setPage] = useState('');

  useEffect(() => {
    const firstPage = schema.form.fields.find((field) => field.type === 'page');

    if (firstPage) {
      setPage(firstPage.id);
    }
  }, [schema.form.fields]);

  return (
    <FormProvider page={page} setPage={setPage}>
      {schema.form.fields.map((field) => (
        <Fragment key={field.id}>
          <RenderField field={field} {...props} />
        </Fragment>
      ))}
    </FormProvider>
  );
}

export default ReactForm;
