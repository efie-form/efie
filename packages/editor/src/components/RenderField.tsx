import type { FormField } from '@efie-form/core';
import useMoveField from '../lib/hooks/useMoveField.ts';
import {
  DATASET_DROP_ZONE,
  DATASET_FORM_FIELD,
  DROP_ZONE_TYPE,
} from '../lib/constant.ts';
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

interface RenderFieldProps {
  field: FormField;
  noSelect?: boolean;
}

function RenderField({ field, noSelect }: RenderFieldProps) {
  const { registerProps } = useMoveField();
  const { setSelectedFieldId, selectedFieldId } = useSettingsStore();
  const setActiveTab = useRightBarState((state) => state.setActiveTab);

  return (
    <>
      <div
        id={field.id}
        key={field.id}
        className={cn(
          'border-2 border-white hover:border-neutral-100 rounded-lg transform bg-white',
          {
            '!border-primary': selectedFieldId === field.id,
          }
        )}
        {...{
          [DATASET_FORM_FIELD]: field.id,
          [DATASET_DROP_ZONE]: DROP_ZONE_TYPE.field,
        }}
        {...(!noSelect && {
          ...registerProps(field.id),
          onClick: (e: MouseEvent) => {
            e.stopPropagation();
            setSelectedFieldId(field.id);
            setActiveTab(RIGHT_BAR_TABS.FIELD_SETTINGS);
          },
        })}
      >
        <FieldItem field={field} />
      </div>
    </>
  );
}

function FieldItem({ field }: RenderFieldProps) {
  const fieldInfo = useFieldInfo({
    fieldId: field.id,
  });

  if (!fieldInfo) return null;

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
      return <ShortTextField field={field} fieldKey={fieldInfo.key} />;
    case 'longText':
      return <LongTextField field={field} fieldKey={fieldInfo.key} />;
    case 'number':
      return <NumberField field={field} fieldKey={fieldInfo.key} />;
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
    default:
      return (
        <div className="px-4 py-2">
          {field.id} {field.type}
        </div>
      );
  }
}

export default RenderField;
