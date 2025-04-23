import type { TextWidget } from '@efie-form/core';
import { Input } from '../../../components/form';
import SettingsFieldVertical from '../property-layouts/SettingsFieldVertical';

interface TextWidgetProps {
  widget: TextWidget;
}

export default function TextWidget({ widget }: TextWidgetProps) {
  return (
    <>
      <SettingsFieldVertical label={widget.label} divider>
        <Input />
      </SettingsFieldVertical>
    </>
  );
}
