import type { FormField, TextWidget } from '@efie-form/core';
import { useFieldText } from '../../../lib/hooks/properties/useFieldText';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { Input } from '../../../components/form';

interface TextWidgetProps {
  widget: TextWidget;
  field: FormField;
}

export default function TextWidget({ widget: { format, label, name, tag }, field }: TextWidgetProps) {
  const { updateValue, value } = useFieldText({
    field,
    type: name,
  });
  console.log(name);

  return (
    <SettingsFieldVertical label={label} divider>
      <Input key={name} value={value} onChange={updateValue} />
    </SettingsFieldVertical>
  );
}
