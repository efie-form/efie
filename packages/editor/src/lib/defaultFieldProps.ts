import type {
  FormField,
  FormFieldBlock,
  FormFieldButton,
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
} from '@efie-form/core';
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
    options: [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ],
    isValueDifferent: false,
    required: false,
  },
});

const multipleChoices = (): FormFieldMultipleChoices => ({
  id: generateId(ID_LENGTH),
  type: 'multipleChoices',
  props: {
    label: 'Multiple Choice',
    options: [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ],
    isValueDifferent: false,
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
    accept: '',
    multiple: false,
  },
});

const divider = (): FormFieldDivider => ({
  id: generateId(ID_LENGTH),
  type: 'divider',
  props: {
    color: '#000000',
    style: 'solid',
    width: 100,
    height: 1,
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
    color: '#000000',
    textAlign: 'center',
  },
});

const paragraph = (): FormFieldParagraph => ({
  id: generateId(ID_LENGTH),
  type: 'paragraph',
  props: {
    text: 'Paragraph',
    color: '#000000',
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
    src: '',
    alt: 'Placeholder',
    objectFit: 'contain',
    textAlign: 'center',
    width: {
      value: 50,
      autoWidth: true,
    },
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

const button = (): FormFieldButton => ({
  id: generateId(ID_LENGTH),
  type: 'button',
  props: {
    label: 'Submit',
    color: '#FFFFFF',
    bgColor: '#5083a7',
    font: {
      size: 16,
      unit: 'px',
      weight: 400,
    },
    fullWidth: false,
    btnType: 'submit',
    border: {
      color: '#000000',
      width: 0,
      radius: {
        topLeft: 6,
        topRight: 6,
        bottomRight: 6,
        bottomLeft: 6,
      },
    },
    padding: {
      top: 6,
      right: 12,
      bottom: 6,
      left: 12,
    },
    align: 'center',
  },
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
  button,
} satisfies Record<FormFieldType, () => FormField>;

export default defaultFieldProps;
