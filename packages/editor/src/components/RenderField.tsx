import type { FormField } from '@efie-form/core';
import ColumnsField from './fieldContents/ColumnsField.tsx';
import RowField from './fieldContents/RowField.tsx';
import { useSettingsStore } from '../lib/state/settings.state.ts';
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
import {
  RIGHT_BAR_TABS,
  useRightBarState,
} from '../lib/state/right-bar.state.ts';
import ButtonField from './fieldContents/ButtonField.tsx';
import BlockField from './fieldContents/BlockField.tsx';
import type { FieldKeyPrefix } from '../lib/genFieldKey.ts';
import useDndItem from './Dnd/useDndItem.tsx';

interface RenderFieldProps {
  field: FormField;
  noSelect?: boolean;
  fieldKey: FieldKeyPrefix;
}

function RenderField({ field, noSelect, fieldKey }: RenderFieldProps) {
  const { setSelectedFieldId, selectedFieldId } = useSettingsStore();
  const setActiveTab = useRightBarState((state) => state.setActiveTab);
  const { attributes } = useDndItem({
    id: field.id,
    type: field.type,
  });

  return (
    <>
      <div
        id={field.id}
        key={field.id}
        {...attributes}
        className={cn('rounded-lg transform', {
          '!border-primary': selectedFieldId === field.id,
          'border-2 border-white border-opacity-0 hover:border-neutral-100':
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
        <FieldItem field={field} fieldKey={fieldKey} />
      </div>
    </>
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
      return <HeaderField field={field} />;
    case 'paragraph':
      return <ParagraphField field={field} />;
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
