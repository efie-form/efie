import type { FormField } from '@efie-form/core';
import ColumnsField from './fields/ColumnsField.tsx';
import RowField from './fields/RowField.tsx';
import {
  RIGHT_BAR_TABS,
  useSettingsStore,
} from '../../../lib/state/settings.state.ts';
import type { MouseEvent } from 'react';
import HeaderField from './fields/HeaderField.tsx';
import ParagraphField from './fields/ParagraphField.tsx';
import ShortTextField from './fields/ShortTextField.tsx';
import LongTextField from './fields/LongTextField.tsx';
import NumberField from './fields/NumberField.tsx';
import DividerField from './fields/DividerField.tsx';
import ImageField from './fields/ImageField.tsx';
import SingleChoiceField from './fields/SingleChoiceField.tsx';
import MultipleChoicesField from './fields/MultipleChoicesField.tsx';
import DateField from './fields/DateField.tsx';
import TimeField from './fields/TimeField.tsx';
import DateTimeField from './fields/DateTimeField.tsx';
import FileField from './fields/FileField.tsx';
import { cn } from '../../../lib/utils.ts';
import ButtonField from './fields/ButtonField.tsx';
import BlockField from './fields/BlockField.tsx';
import { AiOutlineDrag } from 'react-icons/ai';
import { HiTrash } from 'react-icons/hi2';
import useDndItem from '../../../components/dnd-kit/useDndItem.tsx';
import Droppable from '../../../components/dnd-kit/Droppable.tsx';
import { useSchemaStore } from '../../../lib/state/schema.state.ts';

interface RenderFieldProps {
  field: FormField;
  noSelect?: boolean;
}

function RenderField({ field, noSelect }: RenderFieldProps) {
  const {
    setSelectedFieldId,
    selectedFieldId,
    clearSelectedFieldId,
    setActiveTab,
  } = useSettingsStore();
  const isSelected = selectedFieldId === field.id;
  const { deleteField } = useSchemaStore();

  const { attributes, dragHandlerProps } = useDndItem({
    id: field.id,
    type: field.type,
  });

  return (
    <Droppable id={field.id} type={field.type} className="h-full">
      <div
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
                deleteField(field.id);
                clearSelectedFieldId();
              }}
            >
              <HiTrash />
            </button>
          </div>
        )}
        <FieldItem field={field} />
      </div>
    </Droppable>
  );
}

function FieldItem({ field }: RenderFieldProps) {
  switch (field.type) {
    case 'row':
      return <RowField field={field} />;
    case 'column':
      return <ColumnsField field={field} />;
    case 'header':
      return <HeaderField field={field} />;
    case 'paragraph':
      return <ParagraphField field={field} />;
    case 'shortText':
      return <ShortTextField field={field} />;
    case 'longText':
      return <LongTextField field={field} />;
    case 'number':
      return <NumberField field={field} />;
    case 'divider':
      return <DividerField field={field} />;
    case 'image':
      return <ImageField field={field} />;
    case 'singleChoice':
      return <SingleChoiceField field={field} />;
    case 'multipleChoices':
      return <MultipleChoicesField field={field} />;
    case 'date':
      return <DateField field={field} />;
    case 'time':
      return <TimeField field={field} />;
    case 'dateTime':
      return <DateTimeField field={field} />;
    case 'file':
      return <FileField field={field} />;
    case 'button':
      return <ButtonField field={field} />;
    case 'block':
      return <BlockField field={field} />;
    default:
      return (
        <div className="px-4 py-2">
          {field.id} {field.type}
        </div>
      );
  }
}

export default RenderField;
