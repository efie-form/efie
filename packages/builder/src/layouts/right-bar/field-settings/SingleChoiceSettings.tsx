import { WidgetFormat, type SingleChoiceFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidgets from '../widget/render-widget';

interface SingleChoiceSettingsProps {
  field: SingleChoiceFormField;
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
    label: 'Required',
    name: 'required',
    defaultValue: false,
  },
  {
    format: WidgetFormat.OPTIONS,
    label: 'Options',
    name: 'options',
    defaultOptions: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
];

function SingleChoiceSettings({ field }: SingleChoiceSettingsProps) {
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

export default SingleChoiceSettings;
