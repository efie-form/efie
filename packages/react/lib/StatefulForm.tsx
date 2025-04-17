import { useMemo } from 'react';
import type { FormSchema } from '@efie-form/core';
import type { FieldPropsMap } from '../types/FieldProps';
import { DefaultComponents } from './default-components/DefaultComponents';
import ReactForm from './Form';
import {
  FormStateProvider,
  extractInitialValues,
  useFormStateContext,
  type FormStateOptions,
} from './form-state';

// Import styles
import './styles.css';

interface StatefulFormProps extends Partial<FieldPropsMap>, Omit<FormStateOptions, 'initialValues'> {
  /**
   * Form schema
   */
  schema: FormSchema;

  /**
   * Initial values (will override default values from schema)
   */
  initialValues?: Record<string, any>;

  /**
   * Callback when form is submitted
   */
  onSubmit?: (values: Record<string, any>) => void;

  /**
   * Whether to use default components
   * @default true
   */
  useDefaultComponents?: boolean;
}

/**
 * StatefulForm component
 *
 * A form component with built-in state management
 */
function StatefulForm({
  schema,
  initialValues: propInitialValues,
  onChange,
  validate,
  onSubmit,
  useDefaultComponents = true,
  ...fieldComponents
}: StatefulFormProps) {
  // Extract initial values from schema and merge with prop initialValues
  const schemaInitialValues = useMemo(() => extractInitialValues(schema), [schema]);
  const initialValues = useMemo(
    () => ({ ...schemaInitialValues, ...propInitialValues }),
    [schemaInitialValues, propInitialValues]
  );

  // Merge default components with provided components if useDefaultComponents is true
  const components = useMemo(() => {
    if (useDefaultComponents) {
      return { ...DefaultComponents, ...fieldComponents };
    }
    return fieldComponents;
  }, [useDefaultComponents, fieldComponents]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get form values from context and call onSubmit if provided
    if (onSubmit) {
      const formState = useFormStateContext();
      const isValid = formState.validateForm();

      if (isValid) {
        onSubmit(formState.values);
      }
    }
  };

  return (
    <FormStateProvider
      initialValues={initialValues}
      onChange={onChange}
      validate={validate}
    >
      <form onSubmit={handleSubmit} className="efie-form">
        <ReactForm schema={schema} {...components} />

        {onSubmit && (
          <div className="efie-form-submit-container">
            <button type="submit" className="efie-form-submit">
              Submit
            </button>
          </div>
        )}
      </form>
    </FormStateProvider>
  );
}

export default StatefulForm;
