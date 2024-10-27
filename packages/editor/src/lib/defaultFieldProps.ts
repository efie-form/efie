import type {
  FormField,
  FormFieldBlock,
  FormFieldColumn,
  FormFieldDate,
  FormFieldDateTime,
  FormFieldDivider,
  FormFieldFile,
  FormFieldHeader,
  FormFieldImage,
  FormFieldLongText,
  FormFieldMultipleChoices,
  FormFieldNumber,
  FormFieldParagraph,
  FormFieldRow,
  FormFieldShortText,
  FormFieldSingleChoice,
  FormFieldTime,
  FormFieldType,
  FormFieldVideo,
} from '../types/formSchema.ts';
import { generateId } from './utils.ts';

const ID_LENGTH = 10;

const shortText = (): FormFieldShortText => ({
  id: generateId(ID_LENGTH),
  type: 'shortText',
  props: {
    label: 'Short Text',
    placeholder: 'Enter the placeholder',
    required: false,
  },
});

const longText = (): FormFieldLongText => ({
  id: generateId(ID_LENGTH),
  type: 'longText',
  props: {
    label: 'Long Text',
    placeholder: 'Enter the placeholder',
    required: false,
  },
});

const number = (): FormFieldNumber => ({
  id: generateId(ID_LENGTH),
  type: 'number',
  props: {
    label: 'Number',
    placeholder: 'Enter the placeholder',
    required: false,
    min: null,
    max: null,
  },
});

const singleChoice = (): FormFieldSingleChoice => ({
  id: generateId(ID_LENGTH),
  type: 'singleChoice',
  props: {
    label: 'Single Choice',
    options: [],
    required: false,
  },
});

const multipleChoices = (): FormFieldMultipleChoices => ({
  id: generateId(ID_LENGTH),
  type: 'multipleChoices',
  props: {
    label: 'Multiple Choice',
    options: [],
    required: false,
  },
});

const date = (): FormFieldDate => ({
  id: generateId(ID_LENGTH),
  type: 'date',
  props: {
    label: 'Date',
    required: false,
  },
});

const time = (): FormFieldTime => ({
  id: generateId(ID_LENGTH),
  type: 'time',
  props: {
    label: 'Time',
    required: false,
  },
});

const dateTime = (): FormFieldDateTime => ({
  id: generateId(ID_LENGTH),
  type: 'dateTime',
  props: {
    label: 'Date & Time',
    required: false,
  },
});

const file = (): FormFieldFile => ({
  id: generateId(ID_LENGTH),
  type: 'file',
  props: {
    label: 'File',
    required: false,
  },
});

const divider = (): FormFieldDivider => ({
  id: generateId(ID_LENGTH),
  type: 'divider',
  props: {
    color: '#000000',
    style: 'solid',
    width: 100,
  },
});

const header = (): FormFieldHeader => ({
  id: generateId(ID_LENGTH),
  type: 'header',
  props: {
    text: 'Header',
    font: {
      size: 24,
      unit: 'px',
      weight: 400,
    },
    tag: 'h1',
    textAlign: 'center',
  },
});

const paragraph = (): FormFieldParagraph => ({
  id: generateId(ID_LENGTH),
  type: 'paragraph',
  props: {
    text: 'Paragraph',
    font: {
      size: 16,
      unit: 'px',
      weight: 400,
    },
    textAlign: 'center',
  },
});

const image = (): FormFieldImage => ({
  id: generateId(ID_LENGTH),
  type: 'image',
  props: {
    url: '',
    alt: 'Placeholder',
    objectFit: 'contain',
    textAlign: 'center',
    width: {
      value: 50,
      autoWidth: true,
    },
  },
});

const video = (): FormFieldVideo => ({
  id: generateId(ID_LENGTH),
  type: 'video',
  props: {
    src: '',
  },
});

const row = (): FormFieldRow => ({
  id: generateId(ID_LENGTH),
  type: 'row',
  children: [
    {
      id: generateId(ID_LENGTH),
      type: 'column',
      props: {
        width: 50,
      },
      children: [],
    },
    {
      id: generateId(ID_LENGTH),
      type: 'column',
      props: {
        width: 50,
      },
      children: [],
    },
  ],
});

const column = (): FormFieldColumn => ({
  id: generateId(ID_LENGTH),
  type: 'column',
  props: {
    width: 100,
  },
  children: [],
});

const block = (): FormFieldBlock => ({
  id: generateId(ID_LENGTH),
  type: 'block',
  children: [],
});

const defaultFieldProps = {
  shortText,
  longText,
  block,
  multipleChoices,
  row,
  column,
  date,
  dateTime,
  divider,
  file,
  header,
  image,
  number,
  paragraph,
  singleChoice,
  time,
  video,
} satisfies Record<FormFieldType, () => FormField>;

export default defaultFieldProps;
