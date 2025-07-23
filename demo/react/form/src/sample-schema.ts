import type { FormSchema } from '@efie-form/react';

export const sampleSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'fatyfYLSHv',
        type: 'page',
        children: [
          {
            type: 'image',
            id: 'g44cscleaa',
            props: [
              {
                type: 'src',
                value:
                  'https://fastly.picsum.photos/id/908/1280/320.jpg?hmac=KJYy8NERkpk7Ov7atqyTLOI4xzW2X9Q-8hfS7IG96to',
              },
              {
                type: 'alt',
                value: 'Placeholder',
              },
              {
                type: 'objectFit',
                value: 'contain',
              },
              {
                type: 'textAlign',
                value: 'center',
              },
              {
                type: 'width',
                value: {
                  type: 'percentage',
                  value: 100,
                },
              },
            ],
          },
          {
            type: 'heading',
            id: '6qtidns1xq',
            props: [
              {
                type: 'content',
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
                            marks: [
                              {
                                type: 'textStyle',
                                attrs: {
                                  color: undefined,
                                  fontSize: '2rem',
                                },
                              },
                            ],
                            text: 'Event Registration Form',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                type: 'fontSize',
                value: {
                  type: 'length',
                  value: 24,
                  unit: 'px',
                },
              },
              {
                type: 'tag',
                value: 'h1',
              },
              {
                type: 'color',
                value: {
                  rgba: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1,
                  },
                  hsla: {
                    h: 0,
                    s: 0,
                    l: 0,
                    a: 1,
                  },
                  hex: '#000000',
                },
              },
              {
                type: 'textAlign',
                value: 'center',
              },
            ],
          },
          {
            type: 'heading',
            id: '8nnx41u1kt',
            props: [
              {
                type: 'content',
                value: {
                  jsonContent: {
                    type: 'doc',
                    content: [
                      {
                        type: 'paragraph',
                        attrs: {
                          textAlign: 'center',
                        },
                        content: [
                          {
                            type: 'text',
                            marks: [
                              {
                                type: 'textStyle',
                                attrs: {
                                  color: 'rgb(0, 0, 0)',
                                  fontSize: '14px',
                                },
                              },
                            ],
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id nibh id est tincidunt elementum quis at justo. Proin sed elit facilisis, blandit nisi id, accumsan quam. Nunc at maximus libero. Vestibulum ultrices eleifend urna, sit amet euismod ligula fringilla id. ',
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
            type: 'divider',
            id: '5m4eolvz9g',
            props: [
              {
                type: 'color',
                value: {
                  rgba: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1,
                  },
                  hsla: {
                    h: 0,
                    s: 0,
                    l: 0,
                    a: 1,
                  },
                  hex: '#000000',
                },
              },
              {
                type: 'borderStyle',
                value: 'solid',
              },
              {
                type: 'width',
                value: {
                  type: 'percentage',
                  value: 100,
                },
              },
              {
                type: 'height',
                value: {
                  type: 'length',
                  value: 1,
                  unit: 'px',
                },
              },
            ],
          },
          {
            type: 'row',
            id: 'daptu6x5jw',
            props: [],
            children: [
              {
                id: 'kgPdfrVlKh',
                type: 'column',
                props: [
                  {
                    type: 'width',
                    value: {
                      type: 'percentage',
                      value: 50,
                    },
                  },
                ],
                children: [
                  {
                    id: 'e1libi9dse',
                    type: 'short_text',
                    form: {
                      key: '',
                    },
                    props: [
                      {
                        type: 'label',
                        value: 'First Name',
                      },
                      {
                        type: 'placeholder',
                        value: 'Ente your first name',
                      },
                      {
                        type: 'required',
                        value: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'luxIgmFDPZ',
                type: 'column',
                props: [
                  {
                    type: 'width',
                    value: {
                      type: 'percentage',
                      value: 50,
                    },
                  },
                ],
                children: [
                  {
                    id: 'otp7coairj',
                    type: 'short_text',
                    form: {
                      key: '',
                    },
                    props: [
                      {
                        type: 'label',
                        value: 'Last Name',
                      },
                      {
                        type: 'placeholder',
                        value: 'Enter your last name',
                      },
                      {
                        type: 'required',
                        value: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: '150nhbwiaq',
            type: 'short_text',
            form: {
              key: '',
            },
            props: [
              {
                type: 'label',
                value: 'Email Address',
              },
              {
                type: 'placeholder',
                value: 'Enter your email address',
              },
              {
                type: 'required',
                value: false,
              },
            ],
          },
          {
            type: 'number',
            id: '11jzjbzb4z',
            form: {
              key: '',
            },
            props: [
              {
                type: 'label',
                value: 'Your Age',
              },
              {
                type: 'placeholder',
                value: 'Enter your age',
              },
              {
                type: 'required',
                value: false,
              },
            ],
          },
          {
            type: 'single_choice',
            id: 'jbagw3rgrp',
            form: {
              key: '',
            },
            props: [
              {
                type: 'label',
                value: 'What is your education level',
              },
              {
                type: 'options',
                value: [
                  {
                    label: 'Secondary School',
                    value: 'Secondary School',
                  },
                  {
                    label: 'High School',
                    value: 'High School',
                  },
                  {
                    label: 'Diploma',
                    value: 'Diploma',
                  },
                  {
                    label: 'Degree',
                    value: 'Degree',
                  },
                  {
                    label: 'Master',
                    value: 'Master',
                  },
                  {
                    label: 'Other',
                    value: 'Other',
                  },
                ],
              },
              {
                type: 'required',
                value: false,
              },
            ],
          },
          {
            type: 'multiple_choices',
            id: 'ztl5nguhr2',
            form: {
              key: '',
            },
            props: [
              {
                type: 'label',
                value: 'Your favourite topics',
              },
              {
                type: 'options',
                value: [
                  {
                    label: 'International',
                    value: 'Option 1',
                  },
                  {
                    label: 'Technology',
                    value: 'Technology',
                  },
                  {
                    label: 'Pets',
                    value: 'Pets',
                  },
                  {
                    value: 'AI',
                    label: 'AI',
                  },
                  {
                    value: 'Computer',
                    label: 'Computer',
                  },
                ],
              },
              {
                type: 'required',
                value: false,
              },
            ],
          },
          {
            type: 'date',
            id: 'uy3dc5qezn',
            form: {
              key: '',
            },
            props: [
              {
                type: 'label',
                value: 'Date of birth',
              },
              {
                type: 'required',
                value: false,
              },
            ],
          },
          {
            id: 't4eaqvsw07',
            type: 'button',
            props: [
              {
                type: 'label',
                value: 'Visit website',
              },
              {
                type: 'buttonAction',
                value: {
                  action: 'hyperlink',
                  url: 'https://github.com',
                  target: '_blank',
                },
              },
            ],
          },
          {
            id: 'e4qv75f9hv',
            type: 'button',
            props: [
              {
                type: 'label',
                value: 'Next',
              },
              {
                type: 'buttonAction',
                value: {
                  action: 'navigate',
                  pageId: 'mmXxQSTjPs',
                },
              },
            ],
          },
        ],
        props: [
          {
            type: 'pageName',
            value: 'Page 1',
          },
        ],
      },
      {
        type: 'page',
        id: 'mmXxQSTjPs',
        children: [
          {
            type: 'heading',
            id: 'n3s3c5if0y',
            props: [
              {
                type: 'content',
                value: {
                  jsonContent: {
                    type: 'doc',
                    content: [
                      {
                        type: 'paragraph',
                        attrs: {
                          textAlign: undefined,
                        },
                        content: [
                          {
                            type: 'text',
                            marks: [
                              {
                                type: 'bold',
                              },
                            ],
                            text: 'Payment Methods',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                type: 'fontSize',
                value: {
                  type: 'length',
                  value: 24,
                  unit: 'px',
                },
              },
              {
                type: 'tag',
                value: 'h1',
              },
              {
                type: 'color',
                value: {
                  rgba: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1,
                  },
                  hsla: {
                    h: 0,
                    s: 0,
                    l: 0,
                    a: 1,
                  },
                  hex: '#000000',
                },
              },
              {
                type: 'textAlign',
                value: 'center',
              },
            ],
          },
          {
            type: 'file',
            id: 'nazup95zec',
            form: {
              key: '',
            },
            props: [
              {
                type: 'label',
                value: 'Upload your payment receipt',
              },
              {
                type: 'required',
                value: false,
              },
              {
                type: 'maxFiles',
                value: 1,
              },
              {
                type: 'accept',
                value: {
                  allowAll: false,
                  formats: ['.pdf', '.jpg', '.jpeg', '.png', '.gif'],
                },
              },
            ],
          },
          {
            id: '5xcyq4ny00',
            type: 'button',
            props: [
              {
                type: 'label',
                value: 'Submit',
              },
              {
                type: 'buttonAction',
                value: {
                  action: 'submit',
                },
              },
            ],
          },
        ],
        props: [
          {
            type: 'pageName',
            value: 'Page 2',
          },
        ],
      },
    ],
    rules: [],
  },
};
