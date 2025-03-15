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
import { FormFieldType } from '@efie-form/core';

interface RenderSettingsProps {
  field: FormField;
}

function RenderSettings({ field }: RenderSettingsProps) {
  if (!field) return <></>;

  switch (field?.type) {
    case FormFieldType.DATE_TIME: {
      return <DateTimeSettings field={field} />;
    }
    case FormFieldType.DATE: {
      return <DateSettings field={field} />;
    }
    case FormFieldType.LONG_TEXT: {
      return <LongTextSettings field={field} />;
    }
    case FormFieldType.COLUMN: {
      return <></>;
    }
    case FormFieldType.BLOCK: {
      return <BlockSettings field={field} />;
    }
    case FormFieldType.DIVIDER: {
      return <DividerSettings field={field} />;
    }
    case FormFieldType.FILE: {
      return <FileSettings field={field} />;
    }
    case FormFieldType.HEADER: {
      return <HeaderSettings field={field} />;
    }
    case FormFieldType.IMAGE: {
      return <ImageSettings field={field} />;
    }
    case FormFieldType.MULTIPLE_CHOICES: {
      return <MultipleChoicesSettings field={field} />;
    }
    case FormFieldType.ROW: {
      return <RowSettings field={field} />;
    }
    case FormFieldType.NUMBER: {
      return <NumberSettings field={field} />;
    }
    case FormFieldType.PARAGRAPH: {
      return <ParagraphSettings field={field} />;
    }
    case FormFieldType.SHORT_TEXT: {
      return <ShortTextSettings field={field} />;
    }
    case FormFieldType.SINGLE_CHOICE: {
      return <SingleChoiceSettings field={field} />;
    }
    case FormFieldType.TIME: {
      return <TimeSettings field={field} />;
    }
    case FormFieldType.BUTTON: {
      return <ButtonSettings field={field} />;
    }
    default: {
      return <></>;
    }
  }
}

export default RenderSettings;
