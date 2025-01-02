import type { FormField } from '@efie-form/core';
import DateTimeSettings from '../fieldSettings/DateTimeSettings.tsx';
import DateSettings from '../fieldSettings/DateSettings.tsx';
import LongTextSettings from '../fieldSettings/LongTextSettings.tsx';
import BlockSettings from '../fieldSettings/BlockSettings.tsx';
import DividerSettings from '../fieldSettings/DividerSettings.tsx';
import FileSettings from '../fieldSettings/FileSettings.tsx';
import HeaderSettings from '../fieldSettings/HeaderSettings.tsx';
import ImageSettings from '../fieldSettings/ImageSettings.tsx';
import MultipleChoicesSettings from '../fieldSettings/MultipleChoicesSettings.tsx';
import RowSettings from '../fieldSettings/RowSettings.tsx';
import NumberSettings from '../fieldSettings/NumberSettings.tsx';
import ParagraphSettings from '../fieldSettings/ParagraphSettings.tsx';
import ShortTextSettings from '../fieldSettings/ShortTextSettings.tsx';
import SingleChoiceSettings from '../fieldSettings/SingleChoiceSettings.tsx';
import TimeSettings from '../fieldSettings/TimeSettings.tsx';
import type { FieldKeyPrefix } from '../../lib/genFieldKey.ts';
import ButtonSettings from '../fieldSettings/ButtonSettings.tsx';
import { FIELDS_NAME } from '../../lib/constant.ts';
import { HiX } from 'react-icons/hi';
import {
  RIGHT_BAR_TABS,
  useSettingsStore,
} from '../../lib/state/settings.state.ts';

interface RenderSettingsProps {
  field: FormField;
  fieldKey?: FieldKeyPrefix;
}

function RenderSettings({ field, fieldKey }: RenderSettingsProps) {
  const { setActiveTab, clearSelectedFieldId } = useSettingsStore();

  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-100">
        <p className="typography-body1 font-medium text-neutral-700 ps-3">
          {FIELDS_NAME[field.type]}
        </p>
        <button
          className="border-s border-neutral-100 px-2 py-2 hover:bg-neutral-100 transition-all"
          onClick={() => {
            clearSelectedFieldId();
            setActiveTab(RIGHT_BAR_TABS.LAYOUT);
          }}
        >
          <HiX />
        </button>
      </div>
      <FieldItem key={fieldKey} field={field} fieldKey={fieldKey} />
    </>
  );
}

function FieldItem({ field, fieldKey }: RenderSettingsProps) {
  if (!field || !fieldKey) return null;

  switch (field?.type) {
    case 'dateTime':
      return <DateTimeSettings field={field} fieldKey={fieldKey} />;
    case 'date':
      return <DateSettings field={field} fieldKey={fieldKey} />;
    case 'longText':
      return <LongTextSettings field={field} fieldKey={fieldKey} />;
    case 'column':
      return null;
    case 'block':
      return <BlockSettings field={field} fieldKey={fieldKey} />;
    case 'divider':
      return <DividerSettings field={field} fieldKey={fieldKey} />;
    case 'file':
      return <FileSettings field={field} fieldKey={fieldKey} />;
    case 'header':
      return <HeaderSettings field={field} fieldKey={fieldKey} />;
    case 'image':
      return <ImageSettings field={field} fieldKey={fieldKey} />;
    case 'multipleChoices':
      return <MultipleChoicesSettings field={field} fieldKey={fieldKey} />;
    case 'row':
      return <RowSettings field={field} fieldKey={fieldKey} />;
    case 'number':
      return <NumberSettings field={field} fieldKey={fieldKey} />;
    case 'paragraph':
      return <ParagraphSettings field={field} fieldKey={fieldKey} />;
    case 'shortText':
      return <ShortTextSettings field={field} fieldKey={fieldKey} />;
    case 'singleChoice':
      return <SingleChoiceSettings field={field} fieldKey={fieldKey} />;
    case 'time':
      return <TimeSettings field={field} fieldKey={fieldKey} />;
    case 'button':
      return <ButtonSettings field={field} fieldKey={fieldKey} />;
    default:
      return;
  }
}

export default RenderSettings;
