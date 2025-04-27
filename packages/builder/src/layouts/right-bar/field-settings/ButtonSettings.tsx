import { WidgetFormat, type ButtonFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidgets from '../widget/render-widget';

interface ButtonSettingsProps {
  field: ButtonFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.TEXT,
    name: 'label',
    label: 'Label',
  },
  {
    format: WidgetFormat.COLOR,
    name: 'textColor',
    label: 'Text Color',
    defaultColor: '#FFFFFF',
  },
  {
    format: WidgetFormat.COLOR,
    name: 'backgroundColor',
    label: 'Background Color',
    defaultColor: '#3B82F6',
  },
  {
    format: WidgetFormat.FOUR_SIDE,
    name: 'padding',
    label: 'Padding',
    sides: {},
  },
  {
    format: WidgetFormat.FOUR_SIDE,
    name: 'borderRadius',
    label: 'Border Radius',
    sides: {},
  },
  {
    format: WidgetFormat.NUMBER,
    name: 'width',
    label: 'Width',
    min: 0,
  },
  {
    format: WidgetFormat.TEXT,
    name: 'textAlign',
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
      <RenderWidgets widgets={widgets} field={field} />
    </div>
  );
}

export default ButtonSettings;
