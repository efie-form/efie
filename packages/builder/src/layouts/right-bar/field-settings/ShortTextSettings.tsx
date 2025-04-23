import { WidgetType, type ShortTextFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';
interface ShortTextSettingsProps {
  field: ShortTextFormField;
}

const widgets: Widget[] = [
  {
    type: WidgetType.TEXT,
    label: 'Form Key',
  },
  {
    type: WidgetType.TEXT,
    label: 'Label',
  },
  {
    type: WidgetType.TEXT,
    label: 'Placeholder',
  },
  {
    type: WidgetType.SWITCH,
    label: 'Required',
    defaultValue: false,
  },
];

function ShortTextSettings({ field }: ShortTextSettingsProps) {
  const { getFieldKeyById } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        General
      </div>
      {widgets.map(widget => (
        <RenderWidget widget={widget} />
      ))}
    </div>
  );
}

export default ShortTextSettings;
