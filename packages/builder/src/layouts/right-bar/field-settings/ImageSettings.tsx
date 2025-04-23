import { WidgetFormat, type ImageFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface ImageSettingsProps {
  field: ImageFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.TEXT,
    label: 'Source URL',
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Alt Text',
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Text Align',
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Object Fit',
  },
  {
    format: WidgetFormat.NUMBER,
    label: 'Width',
    min: 0,
  },
];

function ImageSettings({ field }: ImageSettingsProps) {
  const { getFieldKeyById } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        Common
      </div>
      {widgets.map(widget => (
        <RenderWidget key={widget.label} widget={widget} />
      ))}
    </div>
  );
}

export default ImageSettings;
