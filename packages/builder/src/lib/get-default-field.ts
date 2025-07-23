import type {
  BlockFormField,
  ButtonFormField,
  ColumnFormField,
  DateFormField,
  DateTimeFormField,
  DividerFormField,
  FileFormField,
  HeadingFormField,
  ImageFormField,
  LongTextFormField,
  MultipleChoiceFormField,
  NumberFormField,
  PageFormField,
  RowFormField,
  ShortTextFormField,
  SingleChoiceFormField,
  TimeFormField,
} from '@efie-form/core';
import { FieldType, PropertyType, SizeType } from '@efie-form/core';
import { generateId } from './utils';

interface PageProps {
  name: string;
}

interface ColumnProps {
  width: number;
}

interface GetDefaultFieldProps<T extends FieldType> {
  type: T;
  page?: PageProps;
  column?: ColumnProps;
  formKey?: string;
}

const ID_LENGTH = 10;

interface GetDefaultFieldReturn {
  short_text: ShortTextFormField;
  long_text: LongTextFormField;
  number: NumberFormField;
  single_choice: SingleChoiceFormField;
  multiple_choices: MultipleChoiceFormField;
  date: DateFormField;
  time: TimeFormField;
  date_time: DateTimeFormField;
  file: FileFormField;
  block: BlockFormField;
  row: RowFormField;
  column: ColumnFormField;
  heading: HeadingFormField;
  image: ImageFormField;
  button: ButtonFormField;
  page: PageFormField;
  divider: DividerFormField;
}

export function getDefaultField<T extends FieldType>(
  props: GetDefaultFieldProps<T>,
): GetDefaultFieldReturn[T];
export function getDefaultField<T extends FieldType>({
  type,
  page,
  column,
  formKey,
}: GetDefaultFieldProps<T>) {
  switch (type) {
    case FieldType.SHORT_TEXT: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.SHORT_TEXT,
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Short Text',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter the placeholder',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.SHORT_TEXT];
    }
    case FieldType.LONG_TEXT: {
      return {
        type: FieldType.LONG_TEXT,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Long Text',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter the placeholder',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.LONG_TEXT];
    }
    case FieldType.NUMBER: {
      return {
        type: FieldType.NUMBER,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Number',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter the placeholder',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.NUMBER];
    }
    case FieldType.SINGLE_CHOICE: {
      return {
        type: FieldType.SINGLE_CHOICE,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Single Choice',
          },
          {
            type: PropertyType.OPTIONS,
            value: [
              { label: 'Option 1', value: 'Option 1' },
              { label: 'Option 2', value: 'Option 2' },
              { label: 'Option 3', value: 'Option 3' },
            ],
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.SINGLE_CHOICE];
    }
    case FieldType.MULTIPLE_CHOICES: {
      return {
        type: FieldType.MULTIPLE_CHOICES,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Multiple Choice',
          },
          {
            type: PropertyType.OPTIONS,
            value: [
              { label: 'Option 1', value: 'Option 1' },
              { label: 'Option 2', value: 'Option 2' },
              { label: 'Option 3', value: 'Option 3' },
            ],
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.MULTIPLE_CHOICES];
    }
    case FieldType.PAGE: {
      return {
        type: FieldType.PAGE,
        id: generateId(ID_LENGTH),
        children: [],
        props: [
          {
            type: PropertyType.PAGE_NAME,
            value: page?.name || 'Page',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.PAGE];
    }
    case FieldType.DATE: {
      return {
        type: FieldType.DATE,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Date',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.DATE];
    }
    case FieldType.TIME: {
      return {
        type: FieldType.TIME,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Time',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.TIME];
    }
    case FieldType.DATE_TIME: {
      return {
        type: FieldType.DATE_TIME,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Date & Time',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.DATE_TIME];
    }
    case FieldType.FILE: {
      return {
        type: FieldType.FILE,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'File',
          },
          {
            type: PropertyType.ACCEPT,
            value: {
              allowAll: true,
              formats: [],
            },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.FILE];
    }
    case FieldType.DIVIDER: {
      return {
        type: FieldType.DIVIDER,
        id: generateId(ID_LENGTH),
        props: [],
      } satisfies GetDefaultFieldReturn[typeof FieldType.DIVIDER];
    }
    case FieldType.HEADING: {
      return {
        type: FieldType.HEADING,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.HEADING_CONTENT,
            value: {
              jsonContent: generateJsonContent(''),
            },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.HEADING];
    }
    case FieldType.IMAGE: {
      return {
        type: FieldType.IMAGE,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.IMAGE_SRC,
            value: '',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.IMAGE];
    }
    case FieldType.ROW: {
      return {
        type: FieldType.ROW,
        id: generateId(ID_LENGTH),
        props: [],
        children: [
          {
            id: generateId(ID_LENGTH),
            type: FieldType.COLUMN,
            props: [
              {
                type: PropertyType.COLUMN_WIDTH,
                value: {
                  type: SizeType.PERCENTAGE,
                  value: 50,
                },
              },
            ],
            children: [],
          },
          {
            id: generateId(ID_LENGTH),
            type: FieldType.COLUMN,
            props: [
              {
                type: PropertyType.COLUMN_WIDTH,
                value: {
                  type: SizeType.PERCENTAGE,
                  value: 50,
                },
              },
            ],
            children: [],
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.ROW];
    }
    case FieldType.COLUMN: {
      return {
        type: FieldType.COLUMN,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.COLUMN_WIDTH,
            value: {
              type: SizeType.PERCENTAGE,
              value: column?.width || 100,
            },
          },
        ],
        children: [],
      } satisfies GetDefaultFieldReturn[typeof FieldType.COLUMN];
    }
    case FieldType.BLOCK: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.BLOCK,
        children: [],
        props: [],
      } satisfies GetDefaultFieldReturn[typeof FieldType.BLOCK];
    }
    case FieldType.BUTTON: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.BUTTON,
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Submit',
          },
          {
            type: PropertyType.BUTTON_ACTION,
            value: {
              action: 'submit',
            },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.BUTTON];
    }
    default: {
      throw new Error(`Unsupported field type: ${type}`);
    }
  }
}

function generateJsonContent(label: string) {
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: label,
          },
        ],
      },
    ],
  };
}
