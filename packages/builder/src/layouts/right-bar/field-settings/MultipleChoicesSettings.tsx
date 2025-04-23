import { WidgetFormat, type MultipleChoiceFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface MultipleChoicesSettingsProps {
  field: MultipleChoiceFormField;
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
    format: WidgetFormat.OPTIONS,
    label: 'Options',
    defaultOptions: [
      { label: 'Option 1', value: 'option1', name: 'option1' },
      { label: 'Option 2', value: 'option2', name: 'option2' },
    ],
  },
];

function MultipleChoicesSettings({ field }: MultipleChoicesSettingsProps) {
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

export default MultipleChoicesSettings;
