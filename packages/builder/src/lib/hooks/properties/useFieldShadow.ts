import { useState, useEffect, useRef } from 'react';
import { PropertyType, type FormField, type BoxShadowProperty, type BoxShadow, SizeUnit } from '@efie-form/core';
import { useSchemaStore } from '../../state/schema.state';
import { getFieldProp } from '../../utils';

const defaultShadowItem: BoxShadow = {
  x: { value: 0, unit: SizeUnit.PX },
  y: { value: 0, unit: SizeUnit.PX },
  blur: { value: 0, unit: SizeUnit.PX },
  spread: { value: 0, unit: SizeUnit.PX },
  color: '#000000',
  inset: false,
};

const defaultShadow: BoxShadowProperty = {
  type: PropertyType.BOX_SHADOW,
  value: [defaultShadowItem],
};

export function useFieldShadow(field: FormField) {
  const { updateFieldProps } = useSchemaStore();
  const shadowProp = getFieldProp(field, PropertyType.BOX_SHADOW);

  // Local state for immediate feedback
  const [localShadows, setLocalShadows] = useState<BoxShadowProperty>(
    shadowProp || defaultShadow,
  );

  // Ref to store pending update
  const pendingUpdateRef = useRef(localShadows);

  // Update local state when prop changes from outside
  useEffect(() => {
    const newValue = shadowProp || defaultShadow;
    if (JSON.stringify(newValue) !== JSON.stringify(pendingUpdateRef.current)) {
      setLocalShadows(newValue);
      pendingUpdateRef.current = newValue;
    }
  }, [shadowProp]);

  // Function to update the shadow value
  const updateShadows = (value: BoxShadowProperty) => {
    // Update local state immediately for smooth UI updates
    setLocalShadows(value);
    pendingUpdateRef.current = value;

    // Schedule global state update
    queueMicrotask(() => {
      updateFieldProps(field.id, PropertyType.BOX_SHADOW, value);
    });
  };

  return {
    shadows: localShadows,
    updateShadows,
  };
}
