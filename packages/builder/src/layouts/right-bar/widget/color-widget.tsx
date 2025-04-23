import type { ColorWidget } from '@efie-form/core';
import SettingsFieldHorizontal from '../property-layouts/SettingsFieldHorizontal';
import { ColorPicker } from '../../../components/form';

interface ColorWidgetProps {
  widget: ColorWidget;
}

export default function ColorWidget({ widget }: ColorWidgetProps) {
  return (
    <>
      <SettingsFieldHorizontal label={widget.label} divider>
        <ColorPicker />
      </SettingsFieldHorizontal>
    </>
  );
}
