import {
  borderRadiusToStyle,
  marginToStyle,
  paddingToStyle,
  PropertyType,
  boxShadowToStyle,
  type LayoutFormField,
} from '@efie-form/core';
import RenderField from '../RenderField';
import { useSchemaStore } from '../../../../lib/state/schema.state';

interface BlockFieldProps {
  field: LayoutFormField;
}

function BlockField({ field }: BlockFieldProps) {
  const { getFieldProps } = useSchemaStore();
  const margin = getFieldProps(field.id, PropertyType.MARGIN);
  const bgColor = getFieldProps(field.id, PropertyType.BG_COLOR);
  const color = getFieldProps(field.id, PropertyType.COLOR);
  const padding = getFieldProps(field.id, PropertyType.PADDING);
  const borderRadius = getFieldProps(field.id, PropertyType.BORDER_RADIUS);
  const boxShadow = getFieldProps(field.id, PropertyType.BOX_SHADOW);

  return (
    <div
      className="min-h-20 w-full transition-all overflow-hidden"
      style={{
        margin: marginToStyle(margin),
        padding: paddingToStyle(padding),
        borderRadius: borderRadiusToStyle(borderRadius),
        boxShadow: boxShadowToStyle(boxShadow),
        backgroundColor: bgColor?.value,
        color: color?.value,
      }}
    >
      {field.children.map((child) => (
        <RenderField field={child} key={child.id} />
      ))}
    </div>
  );
}

export default BlockField;
