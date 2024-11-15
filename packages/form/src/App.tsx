import Form from './components/Form.tsx';
import type { FormSchema } from '@efie-form/core';
import { useState } from 'react';

const data: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'xSFhkWrYuF',
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
      },
      {
        id: 'EXaTnbdLKr',
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
      },
      {
        id: 'qQwleBPnba',
        type: 'image',
        props: {
          src: 'https://img.freepik.com/free-vector/minimalist-mountain-hiking-facebook-profile-cover_23-2149188693.jpg',
          alt: 'Placeholder',
          objectFit: 'contain',
          textAlign: 'center',
          width: {
            value: 50,
            autoWidth: true,
          },
        },
      },
      {
        id: 'ixeopPxMcI',
        type: 'divider',
        props: {
          color: '#000000',
          style: 'solid',
          width: 100,
        },
      },
      {
        id: 'QXeHilTqNE',
        type: 'row',
        children: [
          {
            id: 'nrlJvRQvDM',
            type: 'column',
            props: {
              width: 30,
            },
            children: [
              {
                id: 'dutrKWFYxO',
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
              },
            ],
          },
          {
            id: 'TvMfdMUJuu',
            type: 'column',
            props: {
              width: 70,
            },
            children: [
              {
                id: 'ZueIaKFIcW',
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
              },
            ],
          },
        ],
      },
      {
        id: 'LmSMSHvDmH',
        type: 'shortText',
        props: {
          label: 'Short Text',
          placeholder: 'Enter the placeholder',
          required: false,
        },
      },
      {
        id: 'jPYqMGFhDh',
        type: 'longText',
        props: {
          label: 'Long Text',
          placeholder: 'Enter the placeholder',
          required: false,
        },
      },
      {
        id: 'vnSNHtKXFK',
        type: 'number',
        props: {
          label: 'Number',
          placeholder: 'Enter the placeholder',
          required: false,
          min: null,
          max: null,
        },
      },
      {
        id: 'VZFSiopjvM',
        type: 'singleChoice',
        props: {
          label: 'Single Choice',
          options: [
            {
              label: 'Option 1',
              value: 'Option 1',
            },
            {
              label: 'Option 2',
              value: 'Option 2',
            },
            {
              label: 'Option 3',
              value: 'Option 3',
            },
          ],
          isValueDifferent: false,
          required: false,
        },
      },
      {
        id: 'ozbNWwoTEg',
        type: 'multipleChoices',
        props: {
          label: 'Multiple Choice',
          options: [
            {
              label: 'Option 1',
              value: 'Option 1',
            },
            {
              label: 'Option 2',
              value: 'Option 2',
            },
            {
              label: 'Option 3',
              value: 'Option 3',
            },
          ],
          isValueDifferent: false,
          required: false,
        },
      },
      {
        id: 'KQvfeOMdTA',
        type: 'date',
        props: {
          label: 'Date',
          required: false,
        },
      },
      {
        id: 'dWRVNvpyiu',
        type: 'time',
        props: {
          label: 'Time',
          required: false,
        },
      },
      {
        id: 'xDPXFVRycp',
        type: 'dateTime',
        props: {
          label: 'Date & Time',
          required: false,
        },
      },
      {
        id: 'rJOrzffkap',
        type: 'file',
        props: {
          label: 'File',
          required: false,
          accept: '',
          multiple: false,
        },
      },
      {
        id: 'nnyTMCJtVc',
        type: 'divider',
        props: {
          color: '#000000',
          style: 'solid',
          width: 100,
        },
      },
    ],
  },
};

function App() {
  const [schema] = useState<FormSchema>(data);

  return (
    <>
      <Form schema={schema} />
    </>
  );
}

export default App;
