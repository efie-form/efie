import { useState, useEffect, useRef } from 'react';
import { type FormField, type PropValue, type ColorValue } from '@efie-form/core';
import { useSchemaStore } from '../../state/schema.state';

interface UseFieldSwitchProps {
  field: FormField;
  type: string;
  defaultValue?: boolean;
}

export function useFieldSwitch({ field, type, defaultValue }: UseFieldSwitchProps) {
  const { updateFieldProps } = useSchemaStore();
  const prop = field.props.find(prop => prop.type === type);
  const colorProp = isColorValue(prop)
    ? prop
    : {
        type,
        value: defaultValue || false,
      };

  // Local state for immediate feedback
  const [localColor, setLocalColor] = useState(colorProp?.value || false);

  // Ref to store pending update
  const pendingUpdateRef = useRef(localColor);

  // Update local state when prop changes from outside
  useEffect(() => {
    const newValue = colorProp?.value || false;
    if (newValue !== pendingUpdateRef.current) {
      setLocalColor(newValue);
      pendingUpdateRef.current = newValue;
    }
  }, [colorProp?.value]);

  // Function to update the label value
  const updateValue = (value: boolean) => {
    // Update local state immediately for smooth typing
    setLocalColor(value);
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
    value: localColor,
    updateValue,
  };
}

function isColorValue(prop?: PropValue): prop is ColorValue {
  return typeof prop?.type === 'string';
}
