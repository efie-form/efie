import { WidgetFormat, type BlockFormField, type Widget } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import RenderWidget from '../widget/render-widget';

interface BlockSettingsProps {
  field: BlockFormField;
}

const widgets: Widget[] = [
  {
    format: WidgetFormat.FOUR_SIDE,
    label: 'Padding',
    name: 'padding',
    allName: 'All sides',
    sides: [
      {
        label: 'Top',
        name: 'top',
      },
      {
        label: 'Right',
        name: 'right',
      },
      {
        label: 'Bottom',
        name: 'bottom',
      },
      {
        label: 'Left',
        name: 'left',
      },
    ],
  },
  {
    format: WidgetFormat.FOUR_SIDE,
    label: 'Margin',
    name: 'margin',
    allName: 'All sides',
    sides: [
      {
        label: 'Top',
        name: 'top',
      },
      {
        label: 'Right',
        name: 'right',
      },
      {
        label: 'Bottom',
        name: 'bottom',
      },
      {
        label: 'Left',
        name: 'left',
      },
    ],
  },
  {
    format: WidgetFormat.FOUR_SIDE,
    label: 'Border Radius',
    name: 'borderRadius',
    allName: 'All sides',
    sides: [
      {
        label: 'Top Left',
        name: 'topLeft',
      },
      {
        label: 'Top Right',
        name: 'topRight',
      },
      {
        label: 'Bottom Right',
        name: 'bottomRight',
      },
      {
        label: 'Bottom Left',
        name: 'bottomLeft',
      },
    ],
  },
  {
    format: WidgetFormat.BOX_SHADOW,
    label: 'Box Shadow',
    name: 'boxShadow',
  },
  {
    format: WidgetFormat.COLOR,
    label: 'Background Color',
    name: 'backgroundColor',
    defaultColor: '#FFFFFF',
  },
  {
    format: WidgetFormat.COLOR,
    label: 'Text Color',
    name: 'color',
    defaultColor: '#000000',
  },
];

function BlockSettings({ field }: BlockSettingsProps) {
  const { getFieldKeyById } = useSchemaStore();
  const fieldKey = getFieldKeyById(field.id);
  if (!fieldKey) return <></>;

  return (
    <div>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        Spacing
      </div>
      {widgets.map(widget => (
        <RenderWidget key={widget.label} widget={widget} />
      ))}
    </div>
  );
}

export default BlockSettings;
