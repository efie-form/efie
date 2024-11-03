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

interface RenderFieldProps {
  field: FormField;
  noSelect?: boolean;
}

function RenderField({ field, noSelect }: RenderFieldProps) {
  const { registerProps } = useMoveField();
  const { setSelectedFieldId } = useSettingsStore();

  return (
    <>
      <div
        id={field.id}
        key={field.id}
        className="border border-white hover:border-neutral-100 rounded-lg transform bg-white"
        {...{
          [DATASET_FORM_FIELD]: field.id,
          [DATASET_DROP_ZONE]: DROP_ZONE_TYPE.field,
        }}
        {...(!noSelect && {
          ...registerProps(field.id),
          onClick: (e: MouseEvent) => {
            e.stopPropagation();
            setSelectedFieldId(field.id);
          },
        })}
      >
        <FieldItem field={field} />
      </div>
    </>
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
    default:
      return (
        <div className="px-4 py-2">
          {field.id} {field.type}
        </div>
      );
  }
}

export default RenderField;
