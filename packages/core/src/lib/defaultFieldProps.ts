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
  FormFieldMultipleChoice,
  FormFieldNumber,
  FormFieldParagraph,
  FormFieldShortText,
  FormFieldSingleChoice,
  FormFieldTime,
  FormFieldType,
  FormFieldVideo,
} from '../types/formSchema.ts';

const shortText: Omit<FormFieldShortText, 'id'> = {
  type: 'shortText',
  props: {
    label: 'Short Text',
    placeholder: 'Enter the placeholder',
    required: false,
  },
};

const longText: Omit<FormFieldLongText, 'id'> = {
  type: 'longText',
  props: {
    label: 'Long Text',
    placeholder: 'Enter the placeholder',
    required: false,
  },
};

const number: Omit<FormFieldNumber, 'id'> = {
  type: 'number',
  props: {
    label: 'Number',
    placeholder: 'Enter the placeholder',
    required: false,
    min: null,
    max: null,
  },
};

const singleChoice: Omit<FormFieldSingleChoice, 'id'> = {
  type: 'singleChoice',
  props: {
    label: 'Single Choice',
    options: [],
    required: false,
  },
};

const multipleChoice: Omit<FormFieldMultipleChoice, 'id'> = {
  type: 'multipleChoice',
  props: {
    label: 'Multiple Choice',
    options: [],
    required: false,
  },
};

const date: Omit<FormFieldDate, 'id'> = {
  type: 'date',
  props: {
    label: 'Date',
    required: false,
  },
};

const time: Omit<FormFieldTime, 'id'> = {
  type: 'time',
  props: {
    label: 'Time',
    required: false,
  },
};

const dateTime: Omit<FormFieldDateTime, 'id'> = {
  type: 'dateTime',
  props: {
    label: 'Date & Time',
    required: false,
  },
};

const file: Omit<FormFieldFile, 'id'> = {
  type: 'file',
  props: {
    label: 'File',
    required: false,
  },
};

const divider: Omit<FormFieldDivider, 'id'> = {
  type: 'divider',
};

const header: Omit<FormFieldHeader, 'id'> = {
  type: 'header',
  props: {
    value: 'Header',
  },
};

const paragraph: Omit<FormFieldParagraph, 'id'> = {
  type: 'paragraph',
  props: {
    value: 'Paragraph',
  },
};

const image: Omit<FormFieldImage, 'id'> = {
  type: 'image',
  props: {
    src: '',
  },
};

const video: Omit<FormFieldVideo, 'id'> = {
  type: 'video',
  props: {
    src: '',
  },
};

const row: Omit<FormFieldBlock, 'id'> = {
  type: 'block',
  children: [],
};

const column: Omit<FormFieldColumn, 'id'> = {
  type: 'column',
  props: {
    width: 100,
  },
  children: [],
};

const block: Omit<FormFieldBlock, 'id'> = {
  type: 'block',
  children: [],
};

const defaultFieldProps = {
  shortText,
  longText,
  block,
  multipleChoice,
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
} satisfies Record<FormFieldType, Omit<FormField, 'id'>>;

export default defaultFieldProps;
