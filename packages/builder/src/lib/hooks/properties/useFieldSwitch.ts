import { useState, useEffect, useRef } from 'react';
import { type FormField, type PropValue, type SwitchValue } from '@efie-form/core';
import { useSchemaStore } from '../../state/schema.state';

interface UseFieldSwitchProps {
  field: FormField;
  type: string;
  defaultValue?: boolean;
}

export function useFieldSwitch({ field, type, defaultValue }: UseFieldSwitchProps) {
  const { updateFieldProps } = useSchemaStore();
  const prop = field.props.find(prop => prop.type === type);
  const labelProp = isTextValue(prop)
    ? prop
    : {
        type,
        value: defaultValue || false,
      };

  // Local state for immediate feedback
  const [localLabel, setLocalLabel] = useState(labelProp?.value || false);

  // Ref to store pending update
  const pendingUpdateRef = useRef(localLabel);

  // Update local state when prop changes from outside
  useEffect(() => {
    const newValue = labelProp?.value || false;
    if (newValue !== pendingUpdateRef.current) {
      setLocalLabel(newValue);
      pendingUpdateRef.current = newValue;
    }
  }, [labelProp?.value]);

  // Function to update the label value
  const updateValue = (value: boolean) => {
    // Update local state immediately for smooth typing
    setLocalLabel(value);
    pendingUpdateRef.current = value;

    // Schedule global state update
    queueMicrotask(() => {
      updateFieldProps(field.id, type, {
        type,
        value,
      });
    });
  };

  return {
    value: localLabel,
    updateValue,
  };
}

function isTextValue(prop?: PropValue): prop is SwitchValue {
  return typeof prop?.type === 'string';
}
