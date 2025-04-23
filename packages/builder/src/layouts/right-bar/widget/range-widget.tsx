import type { RangeWidget } from '@efie-form/core';
import { Slider } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';

interface RangeWidgetProps {
  widget: RangeWidget;
}

export default function RangeWidget({ widget }: RangeWidgetProps) {
  return (
    <>
      <SettingsFieldVertical label={widget.label} divider>
        <Slider
          value={0}
          onChange={() => {}}
          min={widget.min ?? 0}
          max={widget.max ?? 100}
          step={widget.step ?? 1}
        />
      </SettingsFieldVertical>
    </>
  );
}
