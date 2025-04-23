import { WidgetFormat, type NumberFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface NumberSettingsProps {
  field: NumberFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.TEXT,
    label: 'Form Key',
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Label',
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Placeholder',
  },
  {
    format: WidgetFormat.SWITCH,
    label: 'Required',
    defaultValue: false,
  },
  {
    format: WidgetFormat.NUMBER,
    label: 'Min',
    min: 0,
  },
  {
    format: WidgetFormat.NUMBER,
    label: 'Max',
    min: 0,
  },
];

function NumberSettings({ field }: NumberSettingsProps) {
  const { getFieldKeyById } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      {widgets.map(widget => (
        <RenderWidget key={widget.label} widget={widget} />
      ))}
    </div>
  );
}

export default NumberSettings;
