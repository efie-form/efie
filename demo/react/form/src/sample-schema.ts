import type { FormSchema } from '@efie-form/core';

export const sampleSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'JEPcWxSHER',
        type: 'shortText',
        props: {
          label: 'Short Text',
          placeholder: 'Enter the placeholder',
          required: false,
        },
      },
      {
        id: 'vDfcJgaesN',
        type: 'longText',
        props: {
          label: 'Long Text',
          placeholder: 'Enter the placeholder',
          required: false,
        },
      },
      {
        id: 'HUvcSTZEZQ',
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
        id: 'wpbMzxJJmF',
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
        id: 'ybelZSrwDq',
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
        id: 'JLaFBRUxwi',
        type: 'date',
        props: {
          label: 'Date',
          required: false,
        },
      },
      {
        id: 'VAjbnhuzGZ',
        type: 'time',
        props: {
          label: 'Time',
          required: false,
        },
      },
      {
        id: 'WQvHPlKJID',
        type: 'dateTime',
        props: {
          label: 'Date & Time',
          required: false,
        },
      },
      {
        id: 'zOHkWdlccF',
        type: 'file',
        props: {
          label: 'File',
          required: false,
          accept: '',
          multiple: false,
        },
      },
      {
        id: 'BFZhlhDgos',
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
      },
      {
        id: 'DGeJtgGkpe',
        type: 'divider',
        props: {
          color: '#000000',
          style: 'solid',
          width: 100,
          height: 1,
        },
      },
      {
        id: 'lVVUIhhmjI',
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
      },
      {
        id: 'KHuvafkKFi',
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
      },
      {
        id: 'htEmkJrosi',
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
      },
      {
        id: 'FcQbUCXHgb',
        type: 'row',
        children: [
          {
            id: 'jMIQWUSOPl',
            type: 'column',
            props: {
              width: 50,
            },
            children: [
              {
                id: 'BDjLIrIJDq',
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
              },
            ],
          },
          {
            id: 'BFyuOrekoj',
            type: 'column',
            props: {
              width: 50,
            },
            children: [
              {
                id: 'kXDklbFuyg',
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
              },
            ],
          },
        ],
      },
    ],
  },
};
