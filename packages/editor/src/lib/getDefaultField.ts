import { FormFieldType, type FormField } from '@efie-form/core';
import { generateId } from './utils.ts';

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
}

const ID_LENGTH = 10;

const containerDefaultProps = {
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  border: {
    color: '#000000',
    width: 0,
    radius: {
      topLeft: 0,
      topRight: 0,
      bottomRight: 0,
      bottomLeft: 0,
    },
  },
};

export const getDefaultField = ({
  type,
  page,
  column,
}: GetDefaultFieldProps): FormField => {
  switch (type) {
    case FormFieldType.SHORT_TEXT: {
      return {
        type: FormFieldType.SHORT_TEXT,
        id: generateId(ID_LENGTH),
        props: {
          label: 'Short Text',
          placeholder: 'Enter the placeholder',
          required: false,
          container: containerDefaultProps,
        },
      };
    }
    case FormFieldType.LONG_TEXT: {
      return {
        type: FormFieldType.LONG_TEXT,
        id: generateId(ID_LENGTH),
        props: {
          label: 'Long Text',
          placeholder: 'Enter the placeholder',
          required: false,
          container: containerDefaultProps,
        },
      };
    }
    case FormFieldType.NUMBER: {
      return {
        type: FormFieldType.NUMBER,
        id: generateId(ID_LENGTH),
        props: {
          label: 'Number',
          placeholder: 'Enter the placeholder',
          required: false,
          min: null,
          max: null,
          container: containerDefaultProps,
        },
      };
    }
    case FormFieldType.SINGLE_CHOICE: {
      return {
        type: FormFieldType.SINGLE_CHOICE,
        id: generateId(ID_LENGTH),
        props: {
          label: 'Single Choice',
          options: [
            { label: 'Option 1', value: 'Option 1' },
            { label: 'Option 2', value: 'Option 2' },
            { label: 'Option 3', value: 'Option 3' },
          ],
          isValueDifferent: false,
          required: false,
          container: containerDefaultProps,
        },
      };
    }
    case FormFieldType.MULTIPLE_CHOICES: {
      return {
        type: FormFieldType.MULTIPLE_CHOICES,
        id: generateId(ID_LENGTH),
        props: {
          label: 'Multiple Choice',
          options: [
            { label: 'Option 1', value: 'Option 1' },
            { label: 'Option 2', value: 'Option 2' },
            { label: 'Option 3', value: 'Option 3' },
          ],
          isValueDifferent: false,
          required: false,
          container: containerDefaultProps,
        },
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
        props: {
          name: page?.name || 'Page',
        },
      };
    }
    case FormFieldType.DATE: {
      return {
        type: FormFieldType.DATE,
        id: generateId(ID_LENGTH),
        props: {
          label: 'Date',
          required: false,
          container: containerDefaultProps,
        },
      };
    }
    case FormFieldType.TIME: {
      return {
        type: FormFieldType.TIME,
        id: generateId(ID_LENGTH),
        props: {
          label: 'Time',
          required: false,
          container: containerDefaultProps,
        },
      };
    }
    case FormFieldType.DATE_TIME: {
      return {
        type: FormFieldType.DATE_TIME,
        id: generateId(ID_LENGTH),
        props: {
          label: 'Date & Time',
          required: false,
          container: containerDefaultProps,
        },
      };
    }
    case FormFieldType.FILE: {
      return {
        type: FormFieldType.FILE,
        id: generateId(ID_LENGTH),
        props: {
          label: 'File',
          required: false,
          multiple: false,
          accept: '',
          container: containerDefaultProps,
        },
      };
    }
    case FormFieldType.DIVIDER: {
      return {
        type: FormFieldType.DIVIDER,
        id: generateId(ID_LENGTH),
        props: {
          color: '#000000',
          style: 'solid',
          width: 100,
          height: 1,
        },
      };
    }
    case FormFieldType.HEADER: {
      return {
        type: FormFieldType.HEADER,
        id: generateId(ID_LENGTH),
        props: {
          content: generateJsonContent('Header'),
          font: {
            size: 24,
            unit: 'px',
            weight: 400,
          },
          tag: 'h1',
          color: '#000000',
          textAlign: 'center',
        },
      };
    }
    case FormFieldType.PARAGRAPH: {
      return {
        type: FormFieldType.PARAGRAPH,
        id: generateId(ID_LENGTH),
        props: {
          content: generateJsonContent('Paragraph'),
          font: {
            size: 16,
            unit: 'px',
            weight: 400,
          },
          color: '#000000',
          textAlign: 'center',
        },
      };
    }
    case FormFieldType.IMAGE: {
      return {
        type: FormFieldType.IMAGE,
        id: generateId(ID_LENGTH),
        props: {
          src: '',
          alt: 'Placeholder',
          objectFit: 'contain',
          textAlign: 'center',
          width: {
            value: 100,
            autoWidth: true,
          },
        },
      };
    }
    case FormFieldType.ROW: {
      return {
        type: FormFieldType.ROW,
        id: generateId(ID_LENGTH),
        props: {
          gap: 0,
        },
        children: [
          {
            id: generateId(ID_LENGTH),
            type: FormFieldType.COLUMN,
            props: {
              width: 50,
            },
            children: [],
          },
          {
            id: generateId(ID_LENGTH),
            type: FormFieldType.COLUMN,
            props: {
              width: 50,
            },
            children: [],
          },
        ],
      };
    }
    case FormFieldType.COLUMN: {
      return {
        type: FormFieldType.COLUMN,
        id: generateId(ID_LENGTH),
        props: {
          width: column?.width || 100,
        },
        children: [],
      };
    }
    case FormFieldType.BLOCK: {
      return {
        id: generateId(ID_LENGTH),
        type: FormFieldType.BLOCK,
        children: [],
        props: {
          padding: {
            top: 16,
            right: 16,
            bottom: 16,
            left: 16,
          },
          boxShadow: [
            {
              x: 0,
              y: 4,
              blur: 6,
              spread: -1,
              color: '#00000019',
              inset: false,
            },
            {
              x: 0,
              y: 2,
              blur: 4,
              spread: -2,
              color: '#00000019',
              inset: false,
            },
          ],
          bgColor: '#FFFFFF',
          border: {
            color: '#000000',
            width: 0,
            radius: {
              topLeft: 8,
              topRight: 8,
              bottomRight: 8,
              bottomLeft: 8,
            },
          },
          color: '#494949',
          margin: {
            bottom: 8,
            left: 0,
            right: 0,
            top: 0,
          },
        },
      };
    }
    case FormFieldType.BUTTON: {
      return {
        id: generateId(ID_LENGTH),
        type: FormFieldType.BUTTON,
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
