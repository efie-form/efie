import { WidgetFormat, type FileFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface FileSettingsProps {
  field: FileFormField;
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
  {
    format: WidgetFormat.TEXT,
    label: 'Accept',
  },
  {
    format: WidgetFormat.NUMBER,
    label: 'Max Files',
    min: 1,
  },
];

function FileSettings({ field }: FileSettingsProps) {
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

export default FileSettings;
