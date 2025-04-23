import type { SwitchWidget } from '@efie-form/core';
import { Switch } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';

interface SwitchWidgetProps {
  widget: SwitchWidget;
}

export default function SwitchWidget({ widget }: SwitchWidgetProps) {
  return (
    <>
      <SettingsFieldVertical label={widget.label} divider>
        <Switch checked={widget.defaultValue} onChange={() => {}} />
      </SettingsFieldVertical>
    </>
  );
}
