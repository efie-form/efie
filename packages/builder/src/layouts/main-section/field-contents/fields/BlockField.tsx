import {
  borderRadiusToStyle,
  marginToStyle,
  paddingToStyle,
  PropertyType,
  boxShadowToStyle,
  type BlockFormField,
  colorToStyle,
} from '@efie-form/core';
import RenderField from '../RenderField';
import { getFieldProp } from '../../../../lib/utils';

interface BlockFieldProps {
  field: BlockFormField;
}

function BlockField({ field }: BlockFieldProps) {
  const margin = getFieldProp(field, PropertyType.MARGIN);
  const bgColor = getFieldProp(field, PropertyType.BACKGROUND_COLOR);
  const color = getFieldProp(field, PropertyType.COLOR);
  const padding = getFieldProp(field, PropertyType.PADDING);
  const borderRadius = getFieldProp(field, PropertyType.BORDER_RADIUS);
  const boxShadow = getFieldProp(field, PropertyType.BOX_SHADOW);

  return (
    <div
      className="min-h-20 w-full transition-all overflow-hidden"
      style={{
        margin: marginToStyle(margin?.value),
        padding: paddingToStyle(padding?.value),
        borderRadius: borderRadiusToStyle(borderRadius?.value),
        boxShadow: boxShadowToStyle(boxShadow?.value),
        backgroundColor: colorToStyle(bgColor?.value),
        color: colorToStyle(color?.value),
      }}
    >
      {field.children.map(child => (
        <RenderField field={child} key={child.id} />
      ))}
    </div>
  );
}

export default BlockField;
