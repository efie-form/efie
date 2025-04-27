import { WidgetFormat, type NumberFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidgets from '../widget/render-widget';

interface NumberSettingsProps {
  field: NumberFormField;
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
    format: WidgetFormat.TEXT,
    name: 'placeholder',
    label: 'Placeholder',
  },
  {
    format: WidgetFormat.SWITCH,
    name: 'required',
    label: 'Required',
    defaultValue: false,
  },
  {
    format: WidgetFormat.NUMBER,
    name: 'min',
    label: 'Min',
    min: 0,
  },
  {
    format: WidgetFormat.NUMBER,
    name: 'max',
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
      <RenderWidgets widgets={widgets} field={field} />
    </div>
  );
}

export default NumberSettings;
