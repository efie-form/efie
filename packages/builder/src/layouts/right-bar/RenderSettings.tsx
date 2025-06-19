import { type FormField } from '@efie-form/core';
import DateTimeSettings from './field-settings/DateTimeSettings';
import DateSettings from './field-settings/DateSettings';
import LongTextSettings from './field-settings/LongTextSettings';
import BlockSettings from './field-settings/BlockSettings';
import DividerSettings from './field-settings/DividerSettings';
import FileSettings from './field-settings/FileSettings';
import HeaderSettings from './field-settings/HeaderSettings';
import ImageSettings from './field-settings/ImageSettings';
import MultipleChoicesSettings from './field-settings/MultipleChoicesSettings';
import RowSettings from './field-settings/RowSettings';
import NumberSettings from './field-settings/NumberSettings';
import ParagraphSettings from './field-settings/ParagraphSettings';
import ShortTextSettings from './field-settings/ShortTextSettings';
import SingleChoiceSettings from './field-settings/SingleChoiceSettings';
import TimeSettings from './field-settings/TimeSettings';
import ButtonSettings from './field-settings/ButtonSettings';
import { FieldType } from '@efie-form/core';

interface RenderSettingsProps {
  field: FormField;
}

function RenderSettings({ field }: RenderSettingsProps) {
  if (!field) return <></>;

  switch (field?.type) {
    case FieldType.DATE_TIME: {
      return <DateTimeSettings field={field} />;
    }
    case FieldType.DATE: {
      return <DateSettings field={field} />;
    }
    case FieldType.LONG_TEXT: {
      return <LongTextSettings field={field} />;
    }
    case FieldType.COLUMN: {
      return <></>;
    }
    case FieldType.BLOCK: {
      return <BlockSettings field={field} />;
    }
    case FieldType.DIVIDER: {
      return <DividerSettings field={field} />;
    }
    case FieldType.FILE: {
      return <FileSettings field={field} />;
    }
    case FieldType.HEADER: {
      return <HeaderSettings field={field} />;
    }
    case FieldType.IMAGE: {
      return <ImageSettings field={field} />;
    }
    case FieldType.MULTIPLE_CHOICES: {
      return <MultipleChoicesSettings field={field} />;
    }
    case FieldType.ROW: {
      return <RowSettings field={field} />;
    }
    case FieldType.NUMBER: {
      return <NumberSettings field={field} />;
    }
    case FieldType.PARAGRAPH: {
      return <ParagraphSettings field={field} />;
    }
    case FieldType.SHORT_TEXT: {
      return <ShortTextSettings field={field} />;
    }
    case FieldType.SINGLE_CHOICE: {
      return <SingleChoiceSettings field={field} />;
    }
    case FieldType.TIME: {
      return <TimeSettings field={field} />;
    }
    case FieldType.BUTTON: {
      return <ButtonSettings field={field} />;
    }
    default: {
      return <></>;
    }
  }
}

export default RenderSettings;
