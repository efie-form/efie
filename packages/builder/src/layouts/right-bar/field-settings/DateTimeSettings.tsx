import { WidgetFormat, type DateTimeFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidgets from '../widget/render-widget';

interface DateTimeSettingsProps {
  field: DateTimeFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.TEXT,
    name: 'formKey',
    label: 'Form Key',
  },
  {
    format: WidgetFormat.TEXT,
    name: 'label',
    label: 'Label',
  },
  {
    format: WidgetFormat.SWITCH,
    name: 'required',
    label: 'Required',
    defaultValue: false,
  },
];

function DateTimeSettings({ field }: DateTimeSettingsProps) {
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

export default DateTimeSettings;
