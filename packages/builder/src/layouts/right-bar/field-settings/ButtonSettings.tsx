import { WidgetFormat, type ButtonFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface ButtonSettingsProps {
  field: ButtonFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.TEXT,
    label: 'Label',
  },
  {
    format: WidgetFormat.COLOR,
    label: 'Text Color',
    defaultColor: '#FFFFFF',
  },
  {
    format: WidgetFormat.COLOR,
    label: 'Background Color',
    defaultColor: '#3B82F6',
  },
  {
    format: WidgetFormat.FOUR_SIDE,
    label: 'Padding',
    sides: {},
  },
  {
    format: WidgetFormat.FOUR_SIDE,
    label: 'Border Radius',
    sides: {},
  },
  {
    format: WidgetFormat.NUMBER,
    label: 'Width',
    min: 0,
  },
  {
    format: WidgetFormat.TEXT,
    label: 'Text Align',
  },
];

function ButtonSettings({ field }: ButtonSettingsProps) {
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

export default ButtonSettings;
