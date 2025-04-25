import type { FormField, SwitchWidget } from '@efie-form/core';
import { Switch } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';
import { useFieldSwitch } from '../../../lib/hooks/properties/useFieldSwitch';

interface SwitchWidgetProps {
  widget: SwitchWidget;
  field: FormField;
}

export default function SwitchWidget({ widget, field }: SwitchWidgetProps) {
  const { updateValue, value } = useFieldSwitch({
    field: field,
    type: widget.name,
    defaultValue: widget.defaultValue,
  });

  return (
    <>
      <SettingsFieldVertical label={widget.label} divider>
        <Switch checked={value} onChange={updateValue} />
      </SettingsFieldVertical>
    </>
  );
}
