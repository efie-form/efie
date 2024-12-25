import type { FormField } from '@efie-form/core';
import ColumnsField from './fieldContents/ColumnsField.tsx';
import RowField from './fieldContents/RowField.tsx';
import {
  RIGHT_BAR_TABS,
  useSettingsStore,
} from '../lib/state/settings.state.ts';
import type { MouseEvent } from 'react';
import HeaderField from './fieldContents/HeaderField.tsx';
import ParagraphField from './fieldContents/ParagraphField.tsx';
import ShortTextField from './fieldContents/ShortTextField.tsx';
import LongTextField from './fieldContents/LongTextField.tsx';
import NumberField from './fieldContents/NumberField.tsx';
import DividerField from './fieldContents/DividerField.tsx';
import ImageField from './fieldContents/ImageField.tsx';
import SingleChoiceField from './fieldContents/SingleChoiceField.tsx';
import MultipleChoicesField from './fieldContents/MultipleChoicesField.tsx';
import DateField from './fieldContents/DateField.tsx';
import TimeField from './fieldContents/TimeField.tsx';
import DateTimeField from './fieldContents/DateTimeField.tsx';
import FileField from './fieldContents/FileField.tsx';
import { cn } from '../lib/utils.ts';
import useFieldInfo from '../lib/hooks/useFieldInfo.ts';
import ButtonField from './fieldContents/ButtonField.tsx';
import BlockField from './fieldContents/BlockField.tsx';
import type { FieldKeyPrefix } from '../lib/genFieldKey.ts';
import { AiOutlineDrag } from 'react-icons/ai';
import { HiTrash } from 'react-icons/hi2';
import { useFieldArray } from 'react-hook-form';
import useDndItem from './dnd-kit/useDndItem.tsx';
import Droppable from './dnd-kit/Droppable.tsx';

interface RenderFieldProps {
  field: FormField;
  noSelect?: boolean;
  fieldKey: FieldKeyPrefix;
  index: number;
  parentId: string;
}

function RenderField({
  field,
  noSelect,
  fieldKey,
  index,
  parentId,
}: RenderFieldProps) {
  const {
    setSelectedFieldId,
    selectedFieldId,
    clearSelectedFieldId,
    setActiveTab,
  } = useSettingsStore();
  const isSelected = selectedFieldId === field.id;
  const parentFieldKey = fieldKey.split('.').slice(0, -1).join('.');

  const { attributes, dragHandlerProps } = useDndItem({
    id: field.id,
    type: field.type,
  });

  const { remove } = useFieldArray({
    name: parentFieldKey,
  });

  return (
    <Droppable id={field.id} type={field.type} className="h-full">
      <div
        id={field.id}
        key={field.id}
        data-field="true"
        {...attributes}
        className={cn('rounded-lg transform relative h-full', {
          '!border-primary': isSelected,
          'border-2 border-white border-opacity-0 [&:not(:has(div[data-field=true]:hover))]:hover:border-neutral-100':
            field.type !== 'column',
        })}
        {...(!noSelect && {
          onClick: (e: MouseEvent) => {
            e.stopPropagation();
            setSelectedFieldId(field.id);
            setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
          },
        })}
      >
        {isSelected && (
          <div className="absolute top-0 left-0 -translate-x-full">
            <div
              {...dragHandlerProps}
              className="bg-primary p-1 text-white cursor-grab"
            >
              <AiOutlineDrag />
            </div>
            <button
              className="bg-danger p-1 text-white"
              onClick={() => {
                remove(index);
                clearSelectedFieldId();
              }}
            >
              <HiTrash />
            </button>
          </div>
        )}
        <FieldItem
          field={field}
          fieldKey={fieldKey}
          index={index}
          parentId={parentId}
        />
      </div>
    </Droppable>
  );
}

function FieldItem({ field, fieldKey }: RenderFieldProps) {
  const fieldInfo = useFieldInfo({
    fieldId: field.id,
  });

  if (!fieldInfo) return null;

  switch (field.type) {
    case 'row':
      return <RowField field={field} fieldKey={fieldKey} />;
    case 'column':
      return <ColumnsField field={field} fieldKey={fieldKey} />;
    case 'header':
      return <HeaderField field={field} fieldKey={fieldKey} />;
    case 'paragraph':
      return <ParagraphField field={field} fieldKey={fieldKey} />;
    case 'shortText':
      return <ShortTextField field={field} fieldKey={fieldKey} />;
    case 'longText':
      return <LongTextField field={field} fieldKey={fieldKey} />;
    case 'number':
      return <NumberField field={field} fieldKey={fieldKey} />;
    case 'divider':
      return <DividerField field={field} />;
    case 'image':
      return <ImageField field={field} />;
    case 'singleChoice':
      return <SingleChoiceField field={field} fieldKey={fieldKey} />;
    case 'multipleChoices':
      return <MultipleChoicesField field={field} fieldKey={fieldKey} />;
    case 'date':
      return <DateField field={field} fieldKey={fieldKey} />;
    case 'time':
      return <TimeField field={field} fieldKey={fieldKey} />;
    case 'dateTime':
      return <DateTimeField field={field} fieldKey={fieldKey} />;
    case 'file':
      return <FileField field={field} fieldKey={fieldKey} />;
    case 'button':
      return <ButtonField field={field} />;
    case 'block':
      return <BlockField field={field} fieldKey={fieldKey} />;
    default:
      return (
        <div className="px-4 py-2">
          {field.id} {field.type}
        </div>
      );
  }
}

export default RenderField;
