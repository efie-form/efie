import type { FormSchema } from '@efie-form/core';

export const sampleSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'lgqyGFLLyW',
        type: 'page',
        children: [
          {
            id: 'DZMLfYJYkl',
            type: 'block',
            children: [
              {
                type: 'image',
                id: 'EhpTuhkTng',
                props: {
                  src: 'https://cmsv2-assets.apptegy.net/uploads/4208/file/1627793/76083d0e-1006-4d17-b552-c9c8b50cabf0.jpeg',
                  alt: 'Placeholder',
                  objectFit: 'contain',
                  textAlign: 'center',
                  width: {
                    value: 100,
                    autoWidth: false,
                  },
                },
              },
            ],
            props: {
              padding: {
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              },
              margin: {
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              },
              border: {
                radius: {
                  bottomLeft: 8,
                  bottomRight: 8,
                  topLeft: 8,
                  topRight: 8,
                },
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
              color: '#494949',
            },
          },
          {
            id: 'BGxKfIGtgJ',
            type: 'block',
            children: [
              {
                type: 'header',
                id: 'GyZFXxFXca',
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
                type: 'paragraph',
                id: 'usXgBhYNpQ',
                props: {
                  text: 'Paragraph',
                  font: {
                    size: 16,
                    unit: 'px',
                    weight: 400,
                  },
                  color: '#000000',
                  textAlign: 'center',
                },
              },
              {
                type: 'shortText',
                id: 'DuXzpuHKyM',
                props: {
                  label: 'Short Text',
                  placeholder: 'Enter the placeholder',
                  required: false,
                },
              },
              {
                type: 'number',
                id: 'gDWrKqeIAU',
                props: {
                  label: 'Number',
                  placeholder: 'Enter the placeholder',
                  required: false,
                  min: null,
                  max: null,
                },
              },
              {
                type: 'longText',
                id: 'BCBTxJGbVY',
                props: {
                  label: 'Long Text',
                  placeholder: 'Enter the placeholder',
                  required: false,
                },
              },
              {
                type: 'multipleChoices',
                id: 'pLyvHmcQpK',
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
                type: 'date',
                id: 'QpumLGMqRC',
                props: {
                  label: 'Date',
                  required: false,
                },
              },
              {
                type: 'time',
                id: 'HEghoFGqnJ',
                props: {
                  label: 'Time',
                  required: false,
                },
              },
              {
                type: 'dateTime',
                id: 'TVGpAHmOFi',
                props: {
                  label: 'Date & Time',
                  required: false,
                },
              },
              {
                type: 'file',
                id: 'qFPhjijHlv',
                props: {
                  label: 'File',
                  required: false,
                  multiple: false,
                  accept: '',
                },
              },
              {
                type: 'singleChoice',
                id: 'XVBmeqEmqA',
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
            ],
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
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              },
            },
          },
        ],
        props: {
          name: 'Page 1',
        },
      },
    ],
  },
};
