import type { FormField } from '@efie-form/core';
import { FormFieldType, PropertyType } from '@efie-form/core';
import { generateId } from './utils';

interface PageProps {
  name: string;
}

interface ColumnProps {
  width: number;
}

interface GetDefaultFieldProps {
  type: (typeof FormFieldType)[keyof typeof FormFieldType];
  page?: PageProps;
  column?: ColumnProps;
  formKey?: string;
}

const ID_LENGTH = 10;

export const getDefaultField = ({
  type,
  page,
  column,
  formKey,
}: GetDefaultFieldProps): FormField => {
  switch (type) {
    case FormFieldType.SHORT_TEXT: {
      return {
        type: FormFieldType.SHORT_TEXT,
        id: generateId(ID_LENGTH),
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
      };
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
      };
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
      };
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
      };
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
      };
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
            type: PropertyType.NAME,
            value: page?.name || 'Page',
          },
        ],
      };
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
      };
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
      };
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
      };
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
            type: PropertyType.MULTIPLE,
            value: false,
          },
          {
            type: PropertyType.ACCEPT,
            value: '',
          },
        ],
      };
    }
    case FormFieldType.DIVIDER: {
      return {
        type: FormFieldType.DIVIDER,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.COLOR,
            value: '#000000',
          },
          {
            type: PropertyType.STYLE,
            value: {
              display: 'block',
            },
          },
          {
            type: PropertyType.WIDTH,
            value: { value: 100, unit: '%' },
          },
          {
            type: PropertyType.HEIGHT,
            value: { value: 1, unit: 'px' },
          },
        ],
      };
    }
    case FormFieldType.HEADER: {
      return {
        type: FormFieldType.HEADER,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.CONTENT,
            value: generateJsonContent('Header'),
          },
          {
            type: PropertyType.FONT,
            value: { value: 24, unit: 'px' },
          },
          {
            type: PropertyType.TAG,
            value: 'h1',
          },
          {
            type: PropertyType.COLOR,
            value: '#000000',
          },
          {
            type: PropertyType.TEXT_ALIGN,
            value: 'center',
          },
        ],
      };
    }
    case FormFieldType.PARAGRAPH: {
      return {
        type: FormFieldType.PARAGRAPH,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.CONTENT,
            value: generateJsonContent('Paragraph'),
          },
          {
            type: PropertyType.FONT,
            value: { value: 16, unit: 'px' },
          },
          {
            type: PropertyType.COLOR,
            value: '#000000',
          },
          {
            type: PropertyType.TEXT_ALIGN,
            value: 'center',
          },
        ],
      };
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
            value: { value: 100, unit: '%' },
          },
        ],
      };
    }
    case FormFieldType.ROW: {
      return {
        type: FormFieldType.ROW,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.GAP,
            value: { value: 0, unit: 'px' },
          },
        ],
        children: [
          {
            id: generateId(ID_LENGTH),
            type: FormFieldType.COLUMN,
            props: [
              {
                type: PropertyType.WIDTH,
                value: { value: 50, unit: '%' },
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
                value: { value: 50, unit: '%' },
              },
            ],
            children: [],
          },
        ],
      };
    }
    case FormFieldType.COLUMN: {
      return {
        type: FormFieldType.COLUMN,
        id: generateId(ID_LENGTH),
        props: [
          {
            type: PropertyType.WIDTH,
            value: { value: column?.width || 100, unit: '%' },
          },
        ],
        children: [],
      };
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
              top: { value: 16, unit: 'px' },
              right: { value: 16, unit: 'px' },
              bottom: { value: 16, unit: 'px' },
              left: { value: 16, unit: 'px' },
            },
          },
          {
            type: PropertyType.MARGIN,
            value: {
              top: { value: 0, unit: 'px' },
              right: { value: 0, unit: 'px' },
              bottom: { value: 8, unit: 'px' },
              left: { value: 0, unit: 'px' },
            },
          },
          {
            type: PropertyType.BG_COLOR,
            value: '#FFFFFF',
          },
          {
            type: PropertyType.COLOR,
            value: '#494949',
          },
          {
            type: PropertyType.BORDER_WIDTH,
            value: { value: 1, unit: 'px' },
          },
          {
            type: PropertyType.BORDER_COLOR,
            value: '#00000019',
          },
          {
            type: PropertyType.BORDER_RADIUS,
            value: {
              topLeft: { value: 8, unit: 'px' },
              topRight: { value: 8, unit: 'px' },
              bottomLeft: { value: 8, unit: 'px' },
              bottomRight: { value: 8, unit: 'px' },
            },
          },
          {
            type: PropertyType.BOX_SHADOW,
            value: [
              {
                x: { value: 0, unit: 'px' },
                y: { value: 4, unit: 'px' },
                blur: { value: 6, unit: 'px' },
                spread: { value: 0, unit: 'px' },
                color: '#00000019',
                inset: false,
              },
              {
                x: { value: 0, unit: 'px' },
                y: { value: 2, unit: 'px' },
                blur: { value: 4, unit: 'px' },
                spread: { value: -2, unit: 'px' },
                color: '#00000019',
                inset: false,
              },
            ],
          },
        ],
      };
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
            value: '#FFFFFF',
          },
          {
            type: PropertyType.BG_COLOR,
            value: '#5083a7',
          },
          {
            type: PropertyType.FONT,
            value: { value: 16, unit: 'px' },
          },
          {
            type: PropertyType.FULL_WIDTH,
            value: false,
          },
          {
            type: PropertyType.BTN_TYPE,
            value: 'submit',
          },
          {
            type: PropertyType.ALIGN,
            value: 'center',
          },
        ],
      };
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
