import Form from './components/Form.tsx';
import type { FormSchema } from '@efie-form/core';
import { useState } from 'react';

const data: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'fjEfLuXvsx',
        type: 'shortText',
        props: {
          label: 'Short Text',
          placeholder: 'Enter the placeholder',
          required: false,
        },
      },
      {
        id: 'NpcvHKGrsq',
        type: 'longText',
        props: {
          label: 'Long Text',
          placeholder: 'Enter the placeholder',
          required: false,
        },
      },
      {
        id: 'qnAecBIYge',
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
        id: 'XBXzzLCcKX',
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
        id: 'iejdsKHENe',
        type: 'date',
        props: {
          label: 'Date',
          required: false,
        },
      },
      {
        id: 'LXkwdXweTp',
        type: 'time',
        props: {
          label: 'Time',
          required: false,
        },
      },
      {
        id: 'nRaUycDRzt',
        type: 'dateTime',
        props: {
          label: 'Date & Time',
          required: false,
        },
      },
      {
        id: 'QWjevtnazO',
        type: 'file',
        props: {
          label: 'File',
          required: false,
          accept: '',
          multiple: false,
        },
      },
      {
        id: 'KCQJziidYX',
        type: 'divider',
        props: {
          color: '#000000',
          style: 'solid',
          width: 100,
        },
      },
      {
        id: 'KwdMkhnmaF',
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
        id: 'FQpnlIPcOp',
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
        id: 'PnmALPuNnz',
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
      },
      {
        id: 'rnQnPHwAnc',
        type: 'row',
        children: [
          {
            id: 'LZbfuFDfDc',
            type: 'column',
            props: {
              width: 50,
            },
            children: [
              {
                id: 'UdEGuHwpHs',
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
                id: 'KKohvraQVO',
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
            id: 'AyllNTNCnE',
            type: 'column',
            props: {
              width: 50,
            },
            children: [
              {
                id: 'uWAwPtwdkC',
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
                id: 'YzCxOjUpkP',
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
        id: 'rjRsraxVDb',
        type: 'divider',
        props: {
          color: '#000000',
          style: 'solid',
          width: 100,
        },
      },
      {
        id: 'WyLblKiOzR',
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
