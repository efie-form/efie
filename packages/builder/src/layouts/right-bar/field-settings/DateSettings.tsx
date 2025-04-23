import { WidgetFormat, type DateFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface DateSettingsProps {
  field: DateFormField;
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
    format: WidgetFormat.SWITCH,
    label: 'Required',
    defaultValue: false,
  },
];

function DateSettings({ field }: DateSettingsProps) {
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

export default DateSettings;
