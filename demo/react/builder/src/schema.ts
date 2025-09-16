import type { FormSchema } from '@efie-form/react';

export const schema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        sys: {
          id: 'giqmxeQnUJ',
          type: 'page',
          name: 'giqmxeQnUJ',
        },
        children: [
          {
            sys: {
              type: 'heading',
              id: 'm9z0ftl1sz',
              name: 'm9z0ftl1sz',
            },
            props: [
              {
                type: 'heading_content',
                value: {
                  jsonContent: {
                    type: 'doc',
                    content: [
                      {
                        type: 'heading',
                        attrs: {
                          textAlign: 'center',
                          level: 1,
                        },
                        content: [
                          {
                            type: 'text',
                            text: 'This is heading',
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
              id: 's3sy9yr992',
              type: 'short_text',
              name: 's3sy9yr992',
            },
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Short Text',
              },
              {
                type: 'placeholder',
                value: 'Enter the placeholder',
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
