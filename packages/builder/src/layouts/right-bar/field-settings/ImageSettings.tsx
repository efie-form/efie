import { WidgetFormat, type ImageFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidgets from '../widget/render-widget';

interface ImageSettingsProps {
  field: ImageFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.TEXT,
    name: 'src',
    label: 'Source URL',
  },
  {
    format: WidgetFormat.TEXT,
    name: 'alt',
    label: 'Alt Text',
  },
  {
    format: WidgetFormat.TEXT,
    name: 'textAlign',
    label: 'Text Align',
  },
  {
    format: WidgetFormat.TEXT,
    name: 'objectFit',
    label: 'Object Fit',
  },
  {
    format: WidgetFormat.NUMBER,
    name: 'width',
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
      <RenderWidgets widgets={widgets} field={field} />
    </div>
  );
}

export default ImageSettings;
