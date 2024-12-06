import type { FormFieldColumn } from '@efie-form/core';
import RenderField from '../RenderField.tsx';
import {
  DATASET_DROP_ZONE,
  DATASET_FORM_FIELD,
  DROP_ZONE_TYPE,
} from '../../lib/constant.ts';
import DndDropzone from '../Dnd/DndDropzone.tsx';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import { useFieldArray } from 'react-hook-form';
import defaultFieldProps from '../../lib/defaultFieldProps.ts';

interface ColumnsFieldProps {
  field: FormFieldColumn;
  fieldKey: FieldKeyPrefix;
}

function ColumnsField({ field, fieldKey }: ColumnsFieldProps) {
  const { insert } = useFieldArray({
    keyName: '_id',
    name: `${fieldKey}.children`,
  });

  return (
    <DndDropzone
      items={field.children.map((child) => child.id)}
      id={field.id}
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
      onNewFieldDrop={(fieldType, index) => {
        const newField = defaultFieldProps[fieldType]();
        insert(index, newField);
      }}
    >
      <div>
        {field.children.map((child, index) => (
          <RenderField
            key={`${field.id}-${child.id}`}
            field={child}
            fieldKey={`${fieldKey}.children.${index}`}
          />
        ))}
        {field.children.length === 0 && <EmptyColumnsField field={field} />}
      </div>
    </DndDropzone>
  );
}

function EmptyColumnsField({ field }: ColumnsFieldProps) {
  return (
    <div
      {...{
        [DATASET_FORM_FIELD]: field.id,
        [DATASET_DROP_ZONE]: DROP_ZONE_TYPE.emptyColumn,
      }}
    >
      Drag and drop fields here
    </div>
  );
}

export default ColumnsField;
