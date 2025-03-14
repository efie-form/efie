import type { FormFieldBlock } from '../../../../../types/formSchema.type.ts';
import RenderField from '../RenderField';

interface BlockFieldProps {
  field: FormFieldBlock;
}

function BlockField({ field }: BlockFieldProps) {
  return (
    <div
      className="min-h-20 w-full transition-all overflow-hidden"
      style={{
        paddingTop: field.props.padding.top,
        paddingRight: field.props.padding.right,
        paddingBottom: field.props.padding.bottom,
        paddingLeft: field.props.padding.left,
        borderTopLeftRadius: field.props.border.radius.topLeft,
        borderTopRightRadius: field.props.border.radius.topRight,
        borderBottomRightRadius: field.props.border.radius.bottomRight,
        borderBottomLeftRadius: field.props.border.radius.bottomLeft,
        marginTop: field.props.margin.top,
        marginRight: field.props.margin.right,
        marginBottom: field.props.margin.bottom,
        marginLeft: field.props.margin.left,
        backgroundColor: field.props.bgColor,
        color: field.props.color,
        boxShadow: field.props.boxShadow
          .map(
            (shadow) =>
              `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}${shadow.inset ? ' inset' : ''}`
          )
          .join(','),
      }}
    >
      {field.children.map((child) => (
        <RenderField field={child} key={child.id} />
      ))}
    </div>
  );
}

export default BlockField;
