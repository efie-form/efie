import type { FormField, TextWidget } from '@efie-form/core';
import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';

interface TextWidgetProps {
  widget: TextWidget;
  field: FormField;
}

export default function TextWidget({ widget: { format, label, name, tag }, field }: TextWidgetProps) {
  const widgetProp = field.props.find(prop => prop.type === name);
  console.log(widgetProp);

  return (
    <>
      <SettingsFieldVertical label={label} divider>
        <Input />
      </SettingsFieldVertical>
    </>
  );
}
