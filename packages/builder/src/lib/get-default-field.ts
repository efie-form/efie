import type {
  AddressFormField,
  BlockFormField,
  ButtonFormField,
  CheckboxFormField,
  ColumnFormField,
  DateFormField,
  DateTimeFormField,
  DividerFormField,
  EmailFormField,
  FileFormField,
  GroupFormField,
  HeadingFormField,
  ImageFormField,
  LongTextFormField,
  MultipleChoiceFormField,
  NumberFormField,
  PageFormField,
  PasswordFormField,
  PhoneFormField,
  RowFormField,
  ShortTextFormField,
  SingleChoiceFormField,
  TimeFormField,
} from '@efie-form/core';
import { FieldType, PropertyType, SizeType } from '@efie-form/core';
import { generateFieldName } from './generate-field-name';
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
  nextFieldCount: number;
  formName?: string;
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
  address: AddressFormField;
  checkbox: CheckboxFormField;
  email: EmailFormField;
  phone: PhoneFormField;
  password: PasswordFormField;
  group: GroupFormField;
}

export function getDefaultField<T extends FieldType>(
  props: GetDefaultFieldProps<T>,
): GetDefaultFieldReturn[T];
export function getDefaultField<T extends FieldType>({
  type,
  page,
  column,
  formName,
  nextFieldCount,
}: GetDefaultFieldProps<T>) {
  switch (type) {
    case FieldType.SHORT_TEXT: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.SHORT_TEXT,
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        children: [],
        props: [
          {
            type: PropertyType.NAME,
            value: page?.name || 'Page',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.PAGE];
    }
    case FieldType.DATE: {
      return {
        type: FieldType.DATE,
        id: generateId(ID_LENGTH),
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        props: [],
      } satisfies GetDefaultFieldReturn[typeof FieldType.DIVIDER];
    }
    case FieldType.HEADING: {
      return {
        type: FieldType.HEADING,
        id: generateId(ID_LENGTH),
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        props: [],
        children: [
          {
            id: generateId(ID_LENGTH),
            type: FieldType.COLUMN,
            sys: {
              name: generateFieldName(type, nextFieldCount + 1),
            },
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
            sys: {
              name: generateFieldName(type, nextFieldCount + 2),
            },
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
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
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        children: [],
        props: [],
      } satisfies GetDefaultFieldReturn[typeof FieldType.BLOCK];
    }
    case FieldType.BUTTON: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.BUTTON,
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
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
    case FieldType.ADDRESS: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.ADDRESS,
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Address',
          },
          {
            type: PropertyType.ADDRESS_FIELD,
            value: {
              addressLine: [{ label: 'Address Line 1' }, { label: 'Address Line 2' }],
              city: { enabled: true, label: 'City' },
              state: { enabled: true, label: 'State' },
              postalCode: { enabled: true, label: 'Postal Code' },
              country: { enabled: true, label: 'Country' },
            },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.ADDRESS];
    }
    case FieldType.CHECKBOX: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.CHECKBOX,
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Checkbox',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.CHECKBOX];
    }
    case FieldType.EMAIL: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.EMAIL,
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Email',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter your email',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.EMAIL];
    }
    case FieldType.PHONE: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.PHONE,
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Phone',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter your phone number',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.PHONE];
    }
    case FieldType.PASSWORD: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.PASSWORD,
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        form: {
          name: formName || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Password',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter your password',
          },
          {
            type: PropertyType.PASSWORD_RULES, // Password Rules (UI label)
            value: {
              min: 8,
              max: 64,
              digits: { min: 1 },
              uppercase: { min: 1 },
              lowercase: { min: 1 },
              special: { min: 0 },
            },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FieldType.PASSWORD];
    }
    case FieldType.GROUP: {
      return {
        id: generateId(ID_LENGTH),
        type: FieldType.GROUP,
        sys: {
          name: generateFieldName(type, nextFieldCount),
        },
        props: [],
        children: [],
      } satisfies GetDefaultFieldReturn[typeof FieldType.GROUP];
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
