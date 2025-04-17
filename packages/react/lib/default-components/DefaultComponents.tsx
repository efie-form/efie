import './styles.css';
import type { FieldPropsMap } from '../../types/FieldProps';
import BlockField from './BlockField';
import ButtonField from './ButtonField';
import ColumnField from './ColumnField';
import DateField from './DateField';
import DateTimeField from './DateTimeField';
import DividerField from './DividerField';
import FileField from './FileField';
import HeaderField from './HeaderField';
import ImageField from './ImageField';
import LongTextField from './LongTextField';
import MultipleChoicesField from './MultipleChoicesField';
import NumberField from './NumberField';
import PageField from './PageField';
import ParagraphField from './ParagraphField';
import RowField from './RowField';
import ShortTextField from './ShortTextField';
import SingleChoiceField from './SingleChoiceField';
import TimeField from './TimeField';

/**
 * Default components for all field types
 * 
 * Use this object to quickly set up a form with default styling
 */
export const DefaultComponents: FieldPropsMap = {
  shortText: ShortTextField,
  longText: LongTextField,
  number: NumberField,
  singleChoice: SingleChoiceField,
  multipleChoices: MultipleChoicesField,
  date: DateField,
  time: TimeField,
  dateTime: DateTimeField,
  file: FileField,
  divider: DividerField,
  header: HeaderField,
  paragraph: ParagraphField,
  image: ImageField,
  row: RowField,
  column: ColumnField,
  block: BlockField,
  page: PageField,
  button: ButtonField,
};
