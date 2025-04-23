import type { NumberWidget } from '@efie-form/core';
import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';

interface NumberWidgetProps {
  widget: NumberWidget;
}

export default function NumberWidget({ widget }: NumberWidgetProps) {
  return (
    <>
      <SettingsFieldVertical label={widget.label} divider>
        <Input
          inputProps={{
            type: 'number',
            min: widget.min,
            max: widget.max
          }}
        />
      </SettingsFieldVertical>
    </>
  );
}
