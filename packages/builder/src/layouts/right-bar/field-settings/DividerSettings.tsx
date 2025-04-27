import { WidgetFormat, type DividerFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidgets from '../widget/render-widget';

interface DividerSettingsProps {
  field: DividerFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.NUMBER,
    name: 'width',
    label: 'Width',
    min: 0,
  },
  {
    format: WidgetFormat.NUMBER,
    name: 'height',
    label: 'Height',
    min: 1,
  },
  {
    format: WidgetFormat.TEXT,
    name: 'borderStyle',
    label: 'Border Style',
  },
  {
    format: WidgetFormat.COLOR,
    name: 'color',
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
      <RenderWidgets widgets={widgets} field={field} />
    </div>
  );
}

export default DividerSettings;
