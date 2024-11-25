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
      <div className="bg-white min-h-20 rounded-lg p-4 w-full mx-auto transition-all shadow-md">
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
