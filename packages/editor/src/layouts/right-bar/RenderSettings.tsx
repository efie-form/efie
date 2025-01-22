import type { FormField } from '@efie-form/core';
import DateTimeSettings from './field-settings/DateTimeSettings.tsx';
import DateSettings from './field-settings/DateSettings.tsx';
import LongTextSettings from './field-settings/LongTextSettings.tsx';
import BlockSettings from './field-settings/BlockSettings.tsx';
import DividerSettings from './field-settings/DividerSettings.tsx';
import FileSettings from './field-settings/FileSettings.tsx';
import HeaderSettings from './field-settings/HeaderSettings.tsx';
import ImageSettings from './field-settings/ImageSettings.tsx';
import MultipleChoicesSettings from './field-settings/MultipleChoicesSettings.tsx';
import RowSettings from './field-settings/RowSettings.tsx';
import NumberSettings from './field-settings/NumberSettings.tsx';
import ParagraphSettings from './field-settings/ParagraphSettings.tsx';
import ShortTextSettings from './field-settings/ShortTextSettings.tsx';
import SingleChoiceSettings from './field-settings/SingleChoiceSettings.tsx';
import TimeSettings from './field-settings/TimeSettings.tsx';
import ButtonSettings from './field-settings/ButtonSettings.tsx';

interface RenderSettingsProps {
  field: FormField;
}

function RenderSettings({ field }: RenderSettingsProps) {
  if (!field) return null;

  switch (field?.type) {
    case 'dateTime':
      return <DateTimeSettings field={field} />;
    case 'date':
      return <DateSettings field={field} />;
    case 'longText':
      return <LongTextSettings field={field} />;
    case 'column':
      return null;
    case 'block':
      return <BlockSettings field={field} />;
    case 'divider':
      return <DividerSettings field={field} />;
    case 'file':
      return <FileSettings field={field} />;
    case 'header':
      return <HeaderSettings field={field} />;
    case 'image':
      return <ImageSettings field={field} />;
    case 'multipleChoices':
      return <MultipleChoicesSettings field={field} />;
    case 'row':
      return <RowSettings field={field} />;
    case 'number':
      return <NumberSettings field={field} />;
    case 'paragraph':
      return <ParagraphSettings field={field} />;
    case 'shortText':
      return <ShortTextSettings field={field} />;
    case 'singleChoice':
      return <SingleChoiceSettings field={field} />;
    case 'time':
      return <TimeSettings field={field} />;
    case 'button':
      return <ButtonSettings field={field} />;
    default:
      return;
  }
}

export default RenderSettings;
