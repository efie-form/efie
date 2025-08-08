import type { FormSchema } from '@efie-form/react';

export const sampleSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'TpRISVLvxQ',
        type: 'page',
        children: [
          {
            type: 'heading',
            id: 'd08i87t5ap',
            props: [
              {
                type: 'heading_content',
                value: {
                  jsonContent: {
                    type: 'doc',
                    content: [
                      {
                        type: 'paragraph',
                        attrs: {
                          textAlign: null,
                        },
                        content: [
                          {
                            type: 'text',
                            text: 'Event registration form',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
          {
            id: 'r6mi72do2v',
            type: 'short_text',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'First Name',
              },
              {
                type: 'placeholder',
                value: 'Enter the placeholder',
              },
            ],
          },
          {
            id: '70r0bi5q3c',
            type: 'button',
            props: [
              {
                type: 'label',
                value: 'Submit',
              },
              {
                type: 'button_action',
                value: {
                  action: 'submit',
                },
              },
            ],
          },
        ],
        props: [
          {
            type: 'name',
            value: 'Page 1',
          },
        ],
      },
    ],
    rules: [],
  },
};
