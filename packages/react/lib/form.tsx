import type { FormSchema, JsonValue } from '@efie-form/core';
import { Fragment, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { FieldPropsMap } from '../types/field-props';
import { ConditionProvider } from './components/condition-provider';
import { FormContextProvider } from './components/form-provider';
import useCondition from './hooks/use-condition';
import RenderField from './render-field';

interface ReactFormProps extends Partial<FieldPropsMap> {
  schema: FormSchema;
  env?: Record<string, JsonValue>;
}

interface FormContentProps extends ReactFormProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

function FormContent({ schema, env, currentPage, setCurrentPage, ...props }: FormContentProps) {
  // Initialize condition handling - now called within FormProvider context
  const conditionState = useCondition({
    schema,
    env,
  });

  return (
    <ConditionProvider value={conditionState}>
      <FormContextProvider page={currentPage} setPage={setCurrentPage}>
        {schema.form.fields.map((field) => (
          <Fragment key={field.sys.id}>
            <RenderField field={field} {...props} />
          </Fragment>
        ))}
      </FormContextProvider>
    </ConditionProvider>
  );
}

function ReactForm({ schema, env, ...props }: ReactFormProps) {
  const firstPageId = schema.form.fields.find((field) => field.sys.type === 'page')?.sys.id;
  const [currentPage, setCurrentPage] = useState(firstPageId || '');
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <FormContent
        schema={schema}
        env={env}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        {...props}
      />
    </FormProvider>
  );
}

export default ReactForm;
