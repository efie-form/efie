import { WidgetFormat, type DividerFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface DividerSettingsProps {
  field: DividerFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.NUMBER,
    label: 'Width',
    min: 0,
  },
  {
    format: WidgetFormat.NUMBER,
    label: 'Height',
    min: 1,
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Border Style',
  },
  {
    format: WidgetFormat.COLOR,
    label: 'Color',
    defaultColor: '#000000',
  },
];

function DividerSettings({ field }: DividerSettingsProps) {
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

export default DividerSettings;
