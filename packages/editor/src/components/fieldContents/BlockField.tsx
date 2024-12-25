import type { FormFieldBlock } from '@efie-form/core';
import RenderField from '../RenderField.tsx';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import genFieldKey from '../../lib/genFieldKey.ts';

interface BlockFieldProps {
  field: FormFieldBlock;
  fieldKey: FieldKeyPrefix;
}

function BlockField({ field, fieldKey }: BlockFieldProps) {
  return (
    <div
      className="min-h-20 w-full transition-all"
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
      {field.children.map((child, index) => (
        <RenderField
          field={child}
          key={child.id}
          fieldKey={genFieldKey(fieldKey, `children.${index}`)}
          index={index}
          parentId={field.id}
        />
      ))}
    </div>
  );
}

export default BlockField;
