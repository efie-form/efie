import { WidgetFormat, type HeaderFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface HeaderSettingsProps {
  field: HeaderFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.TEXT,
    label: 'Content',
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Tag',
  },
  {
    format: WidgetFormat.NUMBER,
    label: 'Font Size',
    min: 8,
    max: 72,
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Text Align',
  },
  {
    format: WidgetFormat.COLOR,
    label: 'Color',
    defaultColor: '#000000',
  },
];

function HeaderSettings({ field }: HeaderSettingsProps) {
  const { getFieldKeyById } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        Text
      </div>
      {widgets.map(widget => (
        <RenderWidget key={widget.label} widget={widget} />
      ))}
    </div>
  );
}

export default HeaderSettings;
