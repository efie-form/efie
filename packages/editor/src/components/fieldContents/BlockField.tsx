import type { FormFieldBlock, FormFieldType } from '@efie-form/core';
import RenderField from '../RenderField.tsx';
import DndDropzone from '../Dnd/DndDropzone.tsx';
import { useFieldArray } from 'react-hook-form';
import defaultFieldProps from '../../lib/defaultFieldProps.ts';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';

interface BlockFieldProps {
  field: FormFieldBlock;
  fieldKey: FieldKeyPrefix;
}

function BlockField({ field, fieldKey }: BlockFieldProps) {
  const { insert } = useFieldArray({
    keyName: '_id',
    name: `${fieldKey}.children`,
  });

  const handleAddNewField = (fieldType: FormFieldType, index: number) => {
    const fieldToAdd = defaultFieldProps[fieldType]();
    insert(index, fieldToAdd);
  };

  return (
    <DndDropzone
      id={field.id}
      items={field.children.map((child) => child.id)}
      onNewFieldDrop={handleAddNewField}
      accepts={[
        'shortText',
        'longText',
        'number',
        'singleChoice',
        'multipleChoices',
        'date',
        'time',
        'dateTime',
        'file',
        'button',
        'divider',
        'header',
        'paragraph',
        'image',
        'row',
      ]}
    >
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
            fieldKey={`${fieldKey}.children.${index}`}
          />
        ))}
      </div>
    </DndDropzone>
  );
}

export default BlockField;
