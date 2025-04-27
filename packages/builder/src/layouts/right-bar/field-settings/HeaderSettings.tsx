import { WidgetFormat, type HeaderFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidgets from '../widget/render-widget';

interface HeaderSettingsProps {
  field: HeaderFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.TEXT,
    name: 'content',
    label: 'Content',
  },
  {
    format: WidgetFormat.TEXT,
    name: 'tag',
    label: 'Tag',
  },
  {
    format: WidgetFormat.NUMBER,
    name: 'fontSize',
    label: 'Font Size',
    min: 8,
    max: 72,
  },
  {
    format: WidgetFormat.TEXT,
    name: 'textAlign',
    label: 'Text Align',
  },
  {
    format: WidgetFormat.COLOR,
    name: 'color',
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
      <RenderWidgets widgets={widgets} field={field} />
    </div>
  );
}

export default HeaderSettings;
