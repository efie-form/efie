import type { FormSchema } from '../../types/form-schema.type';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateId(length: number = 10) {
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const defaultSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'GwBdzomJRf',
        type: 'page',
        children: [
          {
            id: 'ch8fy5hm9h',
            type: 'short_text',
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
          {
            type: 'long_text',
            id: 'prc7sr6twz',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Long Text',
              },
              {
                type: 'placeholder',
                value: 'Enter the placeholder',
              },
            ],
          },
          {
            type: 'number',
            id: '1337vkzqsn',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Number',
              },
              {
                type: 'placeholder',
                value: 'Enter the placeholder',
              },
            ],
          },
          {
            type: 'single_choice',
            id: '9da7355um2',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Single Choice',
              },
              {
                type: 'options',
                value: [
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
              },
            ],
          },
          {
            type: 'multiple_choices',
            id: '03zbsuf5vw',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Multiple Choice',
              },
              {
                type: 'options',
                value: [
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
              },
            ],
          },
          {
            type: 'date',
            id: 'ary1gdokcu',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Date',
              },
            ],
          },
          {
            type: 'time',
            id: '7zsbvjtw8o',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Time',
              },
            ],
          },
          {
            type: 'date_time',
            id: '8gde7uz7qd',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Date & Time',
              },
            ],
          },
          {
            type: 'file',
            id: 'y9pikzhn18',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'File',
              },
              {
                type: 'accept',
                value: {
                  allowAll: true,
                  formats: [],
                },
              },
            ],
          },
          {
            id: 'biee7z26fe',
            type: 'address',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Address',
              },
              {
                type: 'address_field',
                value: {
                  addressLine: [
                    {
                      label: 'Address Line 1',
                    },
                    {
                      label: 'Address Line 2',
                    },
                  ],
                  city: {
                    enabled: true,
                    label: 'City',
                  },
                  state: {
                    enabled: true,
                    label: 'State',
                  },
                  postalCode: {
                    enabled: true,
                    label: 'Postal Code',
                  },
                  country: {
                    enabled: true,
                    label: 'Country',
                  },
                },
              },
            ],
          },
          {
            id: 'ixaf88a4lz',
            type: 'checkbox',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Checkbox',
              },
            ],
          },
          {
            id: '3nej89oklo',
            type: 'email',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Email',
              },
              {
                type: 'placeholder',
                value: 'Enter your email',
              },
            ],
          },
          {
            id: 'pwrw9c198z',
            type: 'phone',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Phone',
              },
              {
                type: 'placeholder',
                value: 'Enter your phone number',
              },
            ],
          },
          {
            id: 'ngm156pwkv',
            type: 'password',
            form: {
              name: '',
            },
            props: [
              {
                type: 'label',
                value: 'Password',
              },
              {
                type: 'placeholder',
                value: 'Enter your password',
              },
              {
                type: 'password_rules',
                value: {
                  min: 8,
                  max: 64,
                  digits: {
                    min: 1,
                  },
                  uppercase: {
                    min: 1,
                  },
                  lowercase: {
                    min: 1,
                  },
                  special: {
                    min: 0,
                  },
                },
              },
            ],
          },
          {
            id: 'o3ig857o8z',
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
          {
            type: 'divider',
            id: 'ffdgs4kmbj',
            props: [],
          },
          {
            type: 'heading',
            id: 'cuhu3sygmz',
            props: [
              {
                type: 'heading_content',
                value: {
                  jsonContent: {
                    type: 'doc',
                    content: [
                      {
                        type: 'paragraph',
                        content: [
                          {
                            type: 'text',
                            text: '',
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
            type: 'image',
            id: 'w4cgstaatx',
            props: [
              {
                type: 'image_src',
                value: '',
              },
            ],
          },
          {
            id: 'qsbtfwli8t',
            type: 'group',
            props: [],
            children: [],
          },
          {
            type: 'row',
            id: 'lexneqllv2',
            props: [],
            children: [
              {
                id: 'qkxabVWCXX',
                type: 'column',
                props: [
                  {
                    type: 'column_width',
                    value: {
                      type: 'percentage',
                      value: 50,
                    },
                  },
                ],
                children: [],
              },
              {
                id: 'DEWUQQdcZW',
                type: 'column',
                props: [
                  {
                    type: 'column_width',
                    value: {
                      type: 'percentage',
                      value: 50,
                    },
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: '2dafqkwb4l',
            type: 'block',
            children: [],
            props: [],
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

export default defaultSchema;
