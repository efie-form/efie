import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsText } from '../../../types/prop-settings.type';
import { useEffect, useState } from 'react';
import type { PropertyDefinition } from '@efie-form/core';

interface PropsTemplateTextProps extends PropSettingsText {
  fieldId: string;
}

export default function PropsTemplateText({ label, placeholder, type, fieldId }: PropsTemplateTextProps) {
  const { getFieldProperty } = useSchemaStore();
  const fieldProperty = getFieldProperty(fieldId, type);

  const [value, setValue] = useState(getValue(fieldProperty));

  useEffect(() => {
    console.log(value);
  }, [fieldProperty?.value]);

  return (
    <SettingsFieldVertical label={label} divider>
      <Input placeholder={placeholder} value={value} />
    </SettingsFieldVertical>
  );
}

const getValue = (props?: PropertyDefinition) => {
  if (!props || !('value' in props)) return '';

  if (typeof props.value !== 'string') {
    console.warn('Expected string value for property, but got:', props.value);
    return '';
  }

  return props.value;
};
