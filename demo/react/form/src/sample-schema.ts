import type { FormSchema } from '@efie-form/react';

export const sampleSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        sys: {
          id: 'TpRISVLvxQ',
          type: 'page',
          name: 'TpRISVLvxQ',
        },
        children: [
          {
            sys: {
              type: 'heading',
              id: 'd08i87t5ap',
              name: 'd08i87t5ap',
            },
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
            sys: {
              id: 'r6mi72do2v',
              type: 'short_text',
              name: 'r6mi72do2v',
            },
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
            sys: {
              id: '70r0bi5q3c',
              type: 'button',
              name: '70r0bi5q3c',
            },
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
        props: [],
      },
    ],
    rules: [],
  },
};
