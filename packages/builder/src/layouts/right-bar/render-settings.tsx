import { FieldType, type FormField } from '@efie-form/core';
import BlockSettings from './field-settings/block-settings';
import ButtonSettings from './field-settings/button-settings';
import DateSettings from './field-settings/date-settings';
import DateTimeSettings from './field-settings/date-time-settings';
import DividerSettings from './field-settings/divider-settings';
import FileSettings from './field-settings/file-settings';
import HeadingSettings from './field-settings/header-settings';
import ImageSettings from './field-settings/image-settings';
import LongTextSettings from './field-settings/long-text-settings';
import MultipleChoicesSettings from './field-settings/multiple-choices-settings';
import NumberSettings from './field-settings/number-settings';
import RowSettings from './field-settings/row-settings';
import ShortTextSettings from './field-settings/short-text-settings';
import SingleChoiceSettings from './field-settings/single-choice-settings';
import TimeSettings from './field-settings/time-settings';

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
    case FieldType.HEADING: {
      return <HeadingSettings field={field} />;
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
