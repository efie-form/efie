import type { FormField, FormFieldType } from '@efie-form/core';
import { generateId } from './utils.ts';

interface PageProps {
  name: string;
}

interface ColumnProps {
  width: number;
}

interface GetDefaultFieldProps {
  type: FormFieldType;
  page?: PageProps;
  column?: ColumnProps;
}

const ID_LENGTH = 10;

export const getDefaultField = ({
  type,
  page,
  column,
}: GetDefaultFieldProps): FormField => {
  switch (type) {
    case 'shortText':
      return {
        type: 'shortText',
        id: generateId(ID_LENGTH),
        props: {
          label: 'Short Text',
          placeholder: 'Enter the placeholder',
          required: false,
          container: {
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
          },
        },
      };
    case 'longText':
      return {
        type: 'longText',
        id: generateId(ID_LENGTH),
        props: {
          label: 'Long Text',
          placeholder: 'Enter the placeholder',
          required: false,
        },
      };
    case 'number':
      return {
        type: 'number',
        id: generateId(ID_LENGTH),
        props: {
          label: 'Number',
          placeholder: 'Enter the placeholder',
          required: false,
          min: null,
          max: null,
        },
      };
    case 'singleChoice':
      return {
        type: 'singleChoice',
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
        },
      };
    case 'multipleChoices':
      return {
        type: 'multipleChoices',
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
        },
      };
    case 'page':
      return {
        type: 'page',
        id: generateId(ID_LENGTH),
        children: [
          getDefaultField({
            type: 'block',
          }),
        ],
        props: {
          name: page?.name || 'Page',
        },
      };
    case 'date':
      return {
        type: 'date',
        id: generateId(ID_LENGTH),
        props: {
          label: 'Date',
          required: false,
        },
      };
    case 'time':
      return {
        type: 'time',
        id: generateId(ID_LENGTH),
        props: {
          label: 'Time',
          required: false,
        },
      };
    case 'dateTime':
      return {
        type: 'dateTime',
        id: generateId(ID_LENGTH),
        props: {
          label: 'Date & Time',
          required: false,
        },
      };
    case 'file':
      return {
        type: 'file',
        id: generateId(ID_LENGTH),
        props: {
          label: 'File',
          required: false,
          multiple: false,
          accept: '',
        },
      };
    case 'divider':
      return {
        type: 'divider',
        id: generateId(ID_LENGTH),
        props: {
          color: '#000000',
          style: 'solid',
          width: 100,
          height: 1,
        },
      };
    case 'header':
      return {
        type: 'header',
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
    case 'paragraph':
      return {
        type: 'paragraph',
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
    case 'image':
      return {
        type: 'image',
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
    case 'row':
      return {
        type: 'row',
        id: generateId(ID_LENGTH),
        props: {},
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
      };
    case 'column':
      return {
        type: 'column',
        id: generateId(ID_LENGTH),
        props: {
          width: column?.width || 100,
        },
        children: [],
      };
    case 'block':
      return {
        id: generateId(ID_LENGTH),
        type: 'block',
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
    case 'button':
      return {
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
      };
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
