import { useState, useCallback } from 'react';
import type { FormSchema } from '@efie-form/core';

export interface FormStateOptions {
  /**
   * Initial form values
   */
  initialValues?: Record<string, any>;
  
  /**
   * Callback when form values change
   */
  onChange?: (values: Record<string, any>) => void;
  
  /**
   * Validation function
   */
  validate?: (values: Record<string, any>) => Record<string, string>;
}

export interface FormState {
  /**
   * Current form values
   */
  values: Record<string, any>;
  
  /**
   * Form validation errors
   */
  errors: Record<string, string>;
  
  /**
   * Set a specific field value
   */
  setValue: (fieldId: string, value: any) => void;
  
  /**
   * Set multiple field values at once
   */
  setValues: (values: Record<string, any>) => void;
  
  /**
   * Reset form to initial values
   */
  resetForm: () => void;
  
  /**
   * Validate the form
   */
  validateForm: () => boolean;
  
  /**
   * Set a specific field error
   */
  setError: (fieldId: string, error: string) => void;
  
  /**
   * Clear all errors
   */
  clearErrors: () => void;
}

/**
 * Hook for managing form state
 * 
 * @param options Form state options
 * @returns Form state object
 */
export function useFormState(options: FormStateOptions = {}): FormState {
  const [values, setValues] = useState<Record<string, any>>(options.initialValues || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setValue = useCallback((fieldId: string, value: any) => {
    setValues(prev => {
      const newValues = { ...prev, [fieldId]: value };
      options.onChange?.(newValues);
      return newValues;
    });
  }, [options.onChange]);

  const setMultipleValues = useCallback((newValues: Record<string, any>) => {
    setValues(prev => {
      const updatedValues = { ...prev, ...newValues };
      options.onChange?.(updatedValues);
      return updatedValues;
    });
  }, [options.onChange]);

  const resetForm = useCallback(() => {
    setValues(options.initialValues || {});
    setErrors({});
    options.onChange?.(options.initialValues || {});
  }, [options.initialValues, options.onChange]);

  const validateForm = useCallback(() => {
    if (options.validate) {
      const validationErrors = options.validate(values);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    }
    return true;
  }, [values, options.validate]);

  const setError = useCallback((fieldId: string, error: string) => {
    setErrors(prev => ({ ...prev, [fieldId]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    values,
    errors,
    setValue,
    setValues: setMultipleValues,
    resetForm,
    validateForm,
    setError,
    clearErrors,
  };
}

/**
 * Extract initial values from a form schema
 * 
 * @param schema Form schema
 * @returns Initial values object
 */
export function extractInitialValues(schema: FormSchema): Record<string, any> {
  const initialValues: Record<string, any> = {};
  
  const processField = (field: any) => {
    // Skip container fields
    if (['block', 'row', 'column', 'page'].includes(field.type)) {
      if (field.children && Array.isArray(field.children)) {
        field.children.forEach(processField);
      }
      return;
    }
    
    // Skip content fields
    if (['header', 'paragraph', 'image', 'divider'].includes(field.type)) {
      return;
    }
    
    // Handle input fields
    if (field.props) {
      // Find default value property
      const defaultValueProp = field.props.find((prop: any) => prop.type === 'defaultValue');
      
      if (defaultValueProp) {
        if (defaultValueProp.stringValue !== undefined) {
          initialValues[field.id] = defaultValueProp.stringValue;
        } else if (defaultValueProp.numberValue !== undefined) {
          initialValues[field.id] = defaultValueProp.numberValue;
        } else if (defaultValueProp.arrayValue !== undefined) {
          initialValues[field.id] = defaultValueProp.arrayValue;
        }
      } else {
        // Set default empty values based on field type
        switch (field.type) {
          case 'shortText':
          case 'longText':
            initialValues[field.id] = '';
            break;
          case 'number':
            initialValues[field.id] = '';
            break;
          case 'singleChoice':
            initialValues[field.id] = '';
            break;
          case 'multipleChoices':
            initialValues[field.id] = [];
            break;
          case 'date':
          case 'time':
          case 'dateTime':
            initialValues[field.id] = new Date();
            break;
          case 'file':
            initialValues[field.id] = null;
            break;
        }
      }
    }
  };
  
  // Process all fields in the schema
  schema.form.fields.forEach(processField);
  
  return initialValues;
}
