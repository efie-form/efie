import type { ShortTextFormField, LongTextFormField, NumberFormField, MultipleChoiceFormField, TimeFormField, DateFormField, SingleChoiceFormField, DateTimeFormField, FileFormField, BlockFormField, RowFormField, ColumnFormField, ImageFormField, ParagraphFormField, HeaderFormField, ButtonFormField, PageFormField, DividerFormField } from '@efie-form/core';
import { FormFieldType, getColorObject, PropertyType, SizeType } from '@efie-form/core';
import { generateId } from './utils';

interface PageProps {
  name: string;
}

interface ColumnProps {
  width: number;
}

interface GetDefaultFieldProps<T extends FormFieldType> {
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
  header: HeaderFormField;
  paragraph: ParagraphFormField;
  image: ImageFormField;
  button: ButtonFormField;
  page: PageFormField;
  divider: DividerFormField;
}

export function getDefaultField<T extends FormFieldType>(props: GetDefaultFieldProps<T>): GetDefaultFieldReturn[T];
export function getDefaultField<T extends FormFieldType>({
  type,
  page,
  column,
  formKey,
}: GetDefaultFieldProps<T>) {
  switch (type) {
    case FormFieldType.SHORT_TEXT: {
      return {
        id: generateId(ID_LENGTH),
        type: FormFieldType.SHORT_TEXT,
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
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.SHORT_TEXT];
    }
    case FormFieldType.LONG_TEXT: {
      return {
        type: FormFieldType.LONG_TEXT,
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
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.LONG_TEXT];
    }
    case FormFieldType.NUMBER: {
      return {
        type: FormFieldType.NUMBER,
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
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.NUMBER];
    }
    case FormFieldType.SINGLE_CHOICE: {
      return {
        type: FormFieldType.SINGLE_CHOICE,
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
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.SINGLE_CHOICE];
    }
    case FormFieldType.MULTIPLE_CHOICES: {
      return {
        type: FormFieldType.MULTIPLE_CHOICES,
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
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.MULTIPLE_CHOICES];
    }
    case FormFieldType.PAGE: {
      return {
        type: FormFieldType.PAGE,
        id: generateId(ID_LENGTH),
        children: [
          getDefaultField({
            type: FormFieldType.BLOCK,
          }),
        ],
        props: [
          {
            type: PropertyType.PAGE_NAME,
            value: page?.name || 'Page',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.PAGE];
    }
    case FormFieldType.DATE: {
      return {
        type: FormFieldType.DATE,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Date',
          },
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.DATE];
    }
    case FormFieldType.TIME: {
      return {
        type: FormFieldType.TIME,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Time',
          },
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.TIME];
    }
    case FormFieldType.DATE_TIME: {
      return {
        type: FormFieldType.DATE_TIME,
        id: generateId(ID_LENGTH),
        form: {
          key: formKey || '',
        },
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Date & Time',
          },
          {
            type: PropertyType.REQUIRED,
            value: false,
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.DATE_TIME];
    }
    case FormFieldType.FILE: {
      return {
        type: FormFieldType.FILE,
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
            type: PropertyType.REQUIRED,
            value: false,
          },
          {
            type: PropertyType.MAX_FILES,
            value: 1,
          },
          {
            type: PropertyType.ACCEPT,
            value: {
              allowAll: true,
              formats: [],
            },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.FILE];
    }
    case FormFieldType.DIVIDER: {
      return {
        type: FormFieldType.DIVIDER,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.COLOR,
            value: getColorObject('#000000'),
          },
          {
            type: PropertyType.BORDER_STYLE,
            value: 'solid',
          },
          {
            type: PropertyType.WIDTH,
            value: { type: SizeType.PERCENTAGE, value: 100 },
          },
          {
            type: PropertyType.HEIGHT,
            value: { type: SizeType.LENGTH, value: 1, unit: 'px' },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.DIVIDER];
    }
    case FormFieldType.HEADER: {
      return {
        type: FormFieldType.HEADER,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.CONTENT,
            value: {
              jsonContent: generateJsonContent('Header'),
            },
          },
          {
            type: PropertyType.FONT_SIZE,
            value: {
              type: SizeType.LENGTH,
              value: 24,
              unit: 'px',
            },
          },
          {
            type: PropertyType.TAG,
            value: 'h1',
          },
          {
            type: PropertyType.COLOR,
            value: getColorObject('#000000'),
          },
          {
            type: PropertyType.TEXT_ALIGN,
            value: 'center',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.HEADER];
    }
    case FormFieldType.PARAGRAPH: {
      return {
        type: FormFieldType.PARAGRAPH,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.CONTENT,
            value: {
              jsonContent: generateJsonContent('Lorem ipsum dolor sit amet'),
            },
          },
          {
            type: PropertyType.FONT_SIZE,
            value: {
              type: SizeType.LENGTH,
              value: 16,
              unit: 'px',
            },
          },
          {
            type: PropertyType.COLOR,
            value: getColorObject('#000000'),
          },
          {
            type: PropertyType.TEXT_ALIGN,
            value: 'center',
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.PARAGRAPH];
    }
    case FormFieldType.IMAGE: {
      return {
        type: FormFieldType.IMAGE,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.SRC,
            value: '',
          },
          {
            type: PropertyType.ALT,
            value: 'Placeholder',
          },
          {
            type: PropertyType.OBJECT_FIT,
            value: 'contain',
          },
          {
            type: PropertyType.TEXT_ALIGN,
            value: 'center',
          },
          {
            type: PropertyType.WIDTH,
            value: {
              type: SizeType.PERCENTAGE,
              value: 100,
            },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.IMAGE];
    }
    case FormFieldType.ROW: {
      return {
        type: FormFieldType.ROW,
        id: generateId(ID_LENGTH),
        props: [],
        children: [
          {
            id: generateId(ID_LENGTH),
            type: FormFieldType.COLUMN,
            props: [
              {
                type: PropertyType.WIDTH,
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
            type: FormFieldType.COLUMN,
            props: [
              {
                type: PropertyType.WIDTH,
                value: {
                  type: SizeType.PERCENTAGE,
                  value: 50,
                },
              },
            ],
            children: [],
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.ROW];
    }
    case FormFieldType.COLUMN: {
      return {
        type: FormFieldType.COLUMN,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.WIDTH,
            value: {
              type: SizeType.PERCENTAGE,
              value: column?.width || 100,
            },
          },
        ],
        children: [],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.COLUMN];
    }
    case FormFieldType.BLOCK: {
      return {
        id: generateId(ID_LENGTH),
        type: FormFieldType.BLOCK,
        children: [],
        props: [
          {
            type: PropertyType.PADDING,
            value: {
              top: { type: SizeType.LENGTH, value: 16, unit: 'px' },
              right: { type: SizeType.LENGTH, value: 16, unit: 'px' },
              bottom: { type: SizeType.LENGTH, value: 16, unit: 'px' },
              left: { type: SizeType.LENGTH, value: 16, unit: 'px' },
            },
          },
          {
            type: PropertyType.MARGIN,
            value: {
              top: { type: SizeType.LENGTH, value: 0, unit: 'px' },
              right: { type: SizeType.LENGTH, value: 0, unit: 'px' },
              bottom: { type: SizeType.LENGTH, value: 8, unit: 'px' },
              left: { type: SizeType.LENGTH, value: 0, unit: 'px' },
            },
          },
          {
            type: PropertyType.BACKGROUND_COLOR,
            value: getColorObject('#FFFFFF'),
          },
          {
            type: PropertyType.COLOR,
            value: getColorObject('#494949'),
          },
          {
            type: PropertyType.BORDER_WIDTH,
            value: { type: SizeType.LENGTH, value: 1, unit: 'px' },
          },
          {
            type: PropertyType.BORDER_COLOR,
            value: getColorObject('#00000019'),
          },
          {
            type: PropertyType.BORDER_RADIUS,
            value: {
              topLeft: { type: SizeType.LENGTH, value: 8, unit: 'px' },
              topRight: { type: SizeType.LENGTH, value: 8, unit: 'px' },
              bottomLeft: { type: SizeType.LENGTH, value: 8, unit: 'px' },
              bottomRight: { type: SizeType.LENGTH, value: 8, unit: 'px' },
            },
          },
          {
            type: PropertyType.BOX_SHADOW,
            value: [
              {
                x: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                y: { type: SizeType.LENGTH, value: 4, unit: 'px' },
                blur: { type: SizeType.LENGTH, value: 6, unit: 'px' },
                spread: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                color: getColorObject('#00000019'),
                inset: false,
              },
              {
                x: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                y: { type: SizeType.LENGTH, value: 2, unit: 'px' },
                blur: { type: SizeType.LENGTH, value: 4, unit: 'px' },
                spread: { type: SizeType.LENGTH, value: -2, unit: 'px' },
                color: getColorObject('#00000019'),
                inset: false,
              },
            ],
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.BLOCK];
    }
    case FormFieldType.BUTTON: {
      return {
        id: generateId(ID_LENGTH),
        type: FormFieldType.BUTTON,
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Submit',
          },
          {
            type: PropertyType.COLOR,
            value: getColorObject('#FFFFFF'),
          },
          {
            type: PropertyType.BACKGROUND_COLOR,
            value: getColorObject('#5083a7'),
          },
          {
            type: PropertyType.FONT_SIZE,
            value: { type: SizeType.LENGTH, value: 16, unit: 'px' },
          },
          {
            type: PropertyType.WIDTH,
            value: {
              type: SizeType.PERCENTAGE,
              value: 100,
            },
          },
          {
            type: PropertyType.BUTTON_TYPE,
            value: 'submit',
          },
          {
            type: PropertyType.TEXT_ALIGN,
            value: 'center',
          },
          {
            type: PropertyType.FONT_WEIGHT,
            value: 600,
          },
          {
            type: PropertyType.BORDER_RADIUS,
            value: {
              topLeft: { type: SizeType.LENGTH, value: 6, unit: 'px' },
              topRight: { type: SizeType.LENGTH, value: 6, unit: 'px' },
              bottomLeft: { type: SizeType.LENGTH, value: 6, unit: 'px' },
              bottomRight: { type: SizeType.LENGTH, value: 6, unit: 'px' },
            },
          },
          {
            type: PropertyType.PADDING,
            value: {
              top: { type: SizeType.LENGTH, value: 6, unit: 'px' },
              right: { type: SizeType.LENGTH, value: 12, unit: 'px' },
              bottom: { type: SizeType.LENGTH, value: 6, unit: 'px' },
              left: { type: SizeType.LENGTH, value: 12, unit: 'px' },
            },
          },
        ],
      } satisfies GetDefaultFieldReturn[typeof FormFieldType.BUTTON];
    }
    default: {
      throw new Error(`Unsupported field type: ${type}`);
    }
  }
};

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
