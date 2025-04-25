import { useState, useEffect, useRef } from 'react';
import { type FormField, type PropValue, type TextValue } from '@efie-form/core';
import { useSchemaStore } from '../../state/schema.state';

interface UseFieldTextProps {
  field: FormField;
  type: string;
}

export function useFieldText({ field, type }: UseFieldTextProps) {
  const { updateFieldProps } = useSchemaStore();
  const prop = field.props.find(prop => prop.type === type);
  const labelProp = isTextValue(prop)
    ? prop
    : {
        type,
        value: '',
      };

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
  const updateValue = (value: string) => {
    // Update local state immediately for smooth typing
    setLocalLabel(value);
    pendingUpdateRef.current = value;

    // Schedule global state update
    queueMicrotask(() => {
      updateFieldProps(field.id, type, { type, value });
    });
  };

  return {
    value: localLabel,
    updateValue,
  };
}

function isTextValue(prop?: PropValue): prop is TextValue {
  return typeof prop?.type === 'string';
}
