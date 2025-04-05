import { useState, useEffect, useRef } from 'react';
import { PropertyType, type FormField } from '@efie-form/core';
import { useSchemaStore } from '../../state/schema.state';
import { getFieldProp } from '../../utils';

export function useFieldLabel(field: FormField) {
  const { updateFieldProps } = useSchemaStore();
  const labelProp = getFieldProp(field, PropertyType.LABEL);

  // Local state for immediate feedback
  const [localLabel, setLocalLabel] = useState(labelProp?.value || '');

  // Ref to store pending update
  const pendingUpdateRef = useRef(localLabel);

  // Update local state when prop changes from outside
  useEffect(() => {
    const newValue = labelProp?.value || '';
    if (newValue !== pendingUpdateRef.current) {
      setLocalLabel(newValue);
      pendingUpdateRef.current = newValue;
    }
  }, [labelProp?.value]);

  // Function to update the label value
  const updateLabel = (value: string) => {
    // Update local state immediately for smooth typing
    setLocalLabel(value);
    pendingUpdateRef.current = value;

    // Schedule global state update
    queueMicrotask(() => {
      updateFieldProps(field.id, PropertyType.LABEL, { value });
    });
  };

  return {
    label: localLabel,
    updateLabel,
  };
}
