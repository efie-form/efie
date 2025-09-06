import type { FormSchema, JsonValue } from '@efie-form/core';
import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { FieldPropsMap } from '../types/field-props';
import { ConditionProvider } from './components/condition-provider';
import { FormContextProvider } from './components/form-provider';
import { useCondition } from './hooks/use-condition';
import RenderField from './render-field';

interface ReactFormProps extends Partial<FieldPropsMap> {
  schema: FormSchema;
  enableConditions?: boolean;
  env?: Record<string, JsonValue>;
}

function ReactForm({ schema, enableConditions = true, env, ...props }: ReactFormProps) {
  const [page, setPage] = useState('');
  const methods = useForm({});

  // Initialize condition handling
  const conditionState = useCondition({
    schema,
    env,
  });

  useEffect(() => {
    const firstPage = schema.form.fields.find((field) => field.type === 'page');

    if (firstPage) {
      setPage(firstPage.id);
    }
  }, [schema.form.fields]);

  const formContent = (
    <FormContextProvider page={page} setPage={setPage}>
      {schema.form.fields.map((field) => (
        <Fragment key={field.id}>
          <RenderField field={field} {...props} />
        </Fragment>
      ))}
    </FormContextProvider>
  );

  return (
    <FormProvider {...methods}>
      {enableConditions ? (
        <ConditionProvider value={conditionState}>{formContent}</ConditionProvider>
      ) : (
        formContent
      )}
    </FormProvider>
  );
}

export default ReactForm;
