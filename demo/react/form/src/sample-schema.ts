import type { FormSchema } from '@efie-form/react';

export const sampleSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'QPBMlESAAd',
        type: 'page',
        children: [
          {
            id: 'PKoJpERvox',
            type: 'block',
            children: [
              {
                type: 'image',
                id: 'hMIiisJZNk',
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
            id: 'qmLzbQiKkv',
            type: 'block',
            children: [
              {
                type: 'header',
                id: 'czUZjmpdLR',
                props: {
                  content: {
                    type: 'doc',
                    content: [
                      {
                        type: 'paragraph',
                        content: [
                          {
                            type: 'text',
                            text: 'Header',
                          },
                        ],
                      },
                    ],
                  },
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
                id: 'PuGLxyYSBK',
                props: {
                  content: {
                    type: 'doc',
                    content: [
                      {
                        type: 'paragraph',
                        content: [
                          {
                            type: 'text',
                            text: 'Paragraph',
                          },
                        ],
                      },
                    ],
                  },
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
                type: 'divider',
                id: 'yVVEPHNxOm',
                props: {
                  color: '#000000',
                  style: 'solid',
                  width: 100,
                  height: 1,
                },
              },
              {
                type: 'shortText',
                id: 'rsfFczKJaY',
                props: {
                  label: 'Short Text',
                  placeholder: 'Enter the placeholder',
                  required: false,
                },
              },
              {
                type: 'longText',
                id: 'KOTBVhEJoj',
                props: {
                  label: 'Long Text',
                  placeholder: 'Enter the placeholder',
                  required: false,
                },
              },
              {
                type: 'number',
                id: 'jlIYBpskIx',
                props: {
                  label: 'Number',
                  placeholder: 'Enter the placeholder',
                  required: false,
                  min: null,
                  max: null,
                },
              },
              {
                type: 'singleChoice',
                id: 'WOIqhtUiCG',
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
                type: 'multipleChoices',
                id: 'smSWYkNOCH',
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
                id: 'kbcSTswHJA',
                props: {
                  label: 'Date',
                  required: false,
                },
              },
              {
                type: 'time',
                id: 'weayGfVRRa',
                props: {
                  label: 'Time',
                  required: false,
                },
              },
              {
                type: 'dateTime',
                id: 'YYOvibtYuE',
                props: {
                  label: 'Date & Time',
                  required: false,
                },
              },
              {
                type: 'file',
                id: 'vVgMzOoJal',
                props: {
                  label: 'File',
                  required: false,
                  multiple: false,
                  accept: '',
                },
              },
              {
                id: 'mxFxIKTgOK',
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
