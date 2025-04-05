import { useState, useEffect, useRef } from 'react';
import {
  PropertyType,
  type FormField,
  type OptionsProperty,
} from '@efie-form/core';
import { useSchemaStore } from '../../state/schema.state';
import { getFieldProp } from '../../utils';

const defaultOptions: OptionsProperty = {
  type: PropertyType.OPTIONS,
  value: [
    {
      label: 'Option 1',
      value: 'Option 1',
    },
    {
      label: 'Option 2',
      value: 'Option 2',
    },
  ],
};

export function useFieldOptions(field: FormField) {
  const { updateFieldProps } = useSchemaStore();
  const optionsProp = getFieldProp(field, PropertyType.OPTIONS);

  // Local state for immediate feedback
  const [localOptions, setLocalOptions] = useState(
    optionsProp?.value || defaultOptions.value
  );

  // Ref to store pending update
  const pendingUpdateRef = useRef(localOptions);

  // Update local state when prop changes from outside
  useEffect(() => {
    const newValue = optionsProp?.value || defaultOptions.value;
    if (JSON.stringify(newValue) !== JSON.stringify(pendingUpdateRef.current)) {
      setLocalOptions(newValue);
      pendingUpdateRef.current = newValue;
    }
  }, [optionsProp?.value]);

  // Function to update the options value
  const updateOptions = (value: typeof defaultOptions.value) => {
    // Update local state immediately for smooth typing
    setLocalOptions(value);
    pendingUpdateRef.current = value;

    // Schedule global state update
    queueMicrotask(() => {
      updateFieldProps(field.id, PropertyType.OPTIONS, { value });
    });
  };

  return {
    options: localOptions,
    updateOptions,
  };
}
