import {
  borderRadiusToStyle,
  marginToStyle,
  paddingToStyle,
  PropertyType,
  type LayoutFormField,
} from '@efie-form/core';
import RenderField from '../RenderField';
import { boxShadowToStyle } from 'node_modules/@efie-form/core/lib/props-parse';

interface BlockFieldProps {
  field: LayoutFormField;
}

function BlockField({ field }: BlockFieldProps) {
  const margin = field.props.find((prop) => prop.type === PropertyType.MARGIN);
  const bgColor = field.props.find(
    (prop) => prop.type === PropertyType.BG_COLOR
  );
  const color = field.props.find((prop) => prop.type === PropertyType.COLOR);
  const padding = field.props.find(
    (prop) => prop.type === PropertyType.PADDING
  );
  const borderRadius = field.props.find(
    (prop) => prop.type === PropertyType.BORDER_RADIUS
  );
  const boxShadow = field.props.find(
    (prop) => prop.type === PropertyType.BOX_SHADOW
  );

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
        // boxShadow: field.props.boxShadow
        //   .map(
        //     (shadow) =>
        //       `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}${shadow.inset ? ' inset' : ''}`
        //   )
        //   .join(','),
      }}
    >
      {field.children.map((child) => (
        <RenderField field={child} key={child.id} />
      ))}
    </div>
  );
}

export default BlockField;
