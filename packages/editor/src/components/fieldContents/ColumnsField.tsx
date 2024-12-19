import type { FormFieldColumn, FormFieldType } from '@efie-form/core';
import RenderField from '../RenderField.tsx';
import {
  DATASET_DROP_ZONE,
  DATASET_FORM_FIELD,
  DROP_ZONE_TYPE,
} from '../../lib/constant.ts';
import DndDropzone from '../Dnd/DndDropzone.tsx';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import { useFieldArray } from 'react-hook-form';
import { getDefaultField } from '../../lib/getDefaultField.ts';
import { useSettingsStore } from '../../lib/state/settings.state.ts';

interface ColumnsFieldProps {
  field: FormFieldColumn;
  fieldKey: FieldKeyPrefix;
}

function ColumnsField({ field, fieldKey }: ColumnsFieldProps) {
  const { insert } = useFieldArray({
    keyName: '_id',
    name: `${fieldKey}.children`,
  });
  const { setSelectedFieldId } = useSettingsStore();
  const hasChildren = field.children.length > 0;

  const handleAddNewField = (fieldType: FormFieldType, index: number) => {
    const newField = getDefaultField({
      type: fieldType,
    });
    insert(index, newField);
    setSelectedFieldId(newField.id);
  };

  return (
    <DndDropzone
      className="h-full"
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
      onNewFieldDrop={handleAddNewField}
    >
      {hasChildren && (
        <div>
          {field.children.map((child, index) => (
            <RenderField
              key={`${field.id}-${child.id}`}
              field={child}
              fieldKey={`${fieldKey}.children.${index}`}
            />
          ))}
        </div>
      )}
      {!hasChildren && (
        <div className="h-full">
          {field.children.length === 0 && (
            <EmptyColumnsField fieldKey={fieldKey} field={field} />
          )}
        </div>
      )}
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
      className="h-full flex justify-center items-center min-h-32"
    >
      Drag and drop fields here
    </div>
  );
}

export default ColumnsField;
