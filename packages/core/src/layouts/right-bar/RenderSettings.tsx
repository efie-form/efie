import { FormFieldType, type FormField } from '../../../../core-old';
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
