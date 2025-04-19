import { type FormSchema } from '@efie-form/react';

export const schema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'mlrlFkadFD',
        type: 'page',
        children: [
          {
            id: 'tgVmfdyEVL',
            type: 'block',
            children: [
              {
                type: 'image',
                id: 'eKuvqzhYfG',
                props: [
                  {
                    type: 'src',
                    value: '',
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
                      value: 100,
                      unit: '%',
                    },
                    autoWidth: true,
                  },
                ],
              },
              {
                type: 'header',
                id: 'twCFXNmRRe',
                props: [
                  {
                    type: 'content',
                    value: {
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
                  },
                  {
                    type: 'fontSize',
                    value: {
                      value: 32,
                      unit: 'px',
                    },
                  },
                  {
                    type: 'tag',
                    value: 'h1',
                  },
                  {
                    type: 'color',
                    value: '#000000',
                  },
                  {
                    type: 'textAlign',
                    value: 'center',
                  },
                ],
              },
              {
                type: 'paragraph',
                id: 'XNzWmGwDsb',
                props: [
                  {
                    type: 'content',
                    value: {
                      type: 'doc',
                      content: [
                        {
                          type: 'paragraph',
                          content: [
                            {
                              type: 'text',
                              text: 'Lorem ipsum dolor sit amet',
                            },
                          ],
                        },
                      ],
                    },
                  },
                  {
                    type: 'fontSize',
                    value: {
                      value: 16,
                      unit: 'px',
                    },
                  },
                  {
                    type: 'color',
                    value: '#000000',
                  },
                  {
                    type: 'textAlign',
                    value: 'center',
                  },
                ],
              },
              {
                type: 'divider',
                id: 'WruHHsdzzL',
                props: [
                  {
                    type: 'color',
                    value: '#000000',
                  },
                  {
                    type: 'style',
                    value: {
                      display: 'block',
                    },
                  },
                  {
                    type: 'width',
                    value: {
                      value: 100,
                      unit: '%',
                    },
                    autoWidth: true,
                  },
                  {
                    type: 'height',
                    value: {
                      value: 1,
                      unit: 'px',
                    },
                  },
                ],
              },
              {
                id: 'rQDnBQxKoq',
                type: 'short_text',
                form: {
                  key: '',
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
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
              {
                type: 'long_text',
                id: 'MIREavJOjB',
                form: {
                  key: '',
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
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
              {
                type: 'number',
                id: 'EWOyJelaDS',
                form: {
                  key: '',
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
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
              {
                type: 'row',
                id: 'MCfHCvMmRH',
                props: [],
                children: [
                  {
                    id: 'dDKjyGGjtf',
                    type: 'column',
                    props: [
                      {
                        type: 'width',
                        value: {
                          value: 50,
                          unit: '%',
                        },
                        autoWidth: false,
                      },
                    ],
                    children: [
                      {
                        type: 'single_choice',
                        id: 'IcFYvpxWsP',
                        form: {
                          key: '',
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
                          {
                            type: 'required',
                            value: false,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'OyHzRLjNIp',
                    type: 'column',
                    props: [
                      {
                        type: 'width',
                        value: {
                          value: 50,
                          unit: '%',
                        },
                        autoWidth: false,
                      },
                    ],
                    children: [
                      {
                        type: 'multiple_choices',
                        id: 'tvEXslMoaB',
                        form: {
                          key: '',
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
                type: 'time',
                id: 'sNlnKzttTx',
                form: {
                  key: '',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Time',
                  },
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
              {
                type: 'date',
                id: 'ySgpeuooej',
                form: {
                  key: '',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Date',
                  },
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
              {
                type: 'file',
                id: 'WRnkQtPZrN',
                form: {
                  key: '',
                },
                props: [
                  {
                    type: 'label',
                    value: 'File',
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
                    allowAll: true,
                    formats: [],
                  },
                ],
              },
              {
                id: 'liZYAiVrko',
                type: 'button',
                props: [
                  {
                    type: 'label',
                    value: 'Submit',
                  },
                  {
                    type: 'color',
                    value: '#FFFFFF',
                  },
                  {
                    type: 'bgColor',
                    value: '#5083a7',
                  },
                  {
                    type: 'fontSize',
                    value: {
                      value: 16,
                      unit: 'px',
                    },
                  },
                  {
                    type: 'width',
                    value: {
                      value: 100,
                      unit: '%',
                    },
                    autoWidth: true,
                  },
                  {
                    type: 'btnType',
                    value: 'submit',
                  },
                  {
                    type: 'textAlign',
                    value: 'center',
                  },
                  {
                    type: 'fontWeight',
                    value: 600,
                  },
                  {
                    type: 'borderRadius',
                    value: {
                      topLeft: {
                        value: 6,
                        unit: 'px',
                      },
                      topRight: {
                        value: 6,
                        unit: 'px',
                      },
                      bottomLeft: {
                        value: 6,
                        unit: 'px',
                      },
                      bottomRight: {
                        value: 6,
                        unit: 'px',
                      },
                    },
                  },
                  {
                    type: 'padding',
                    value: {
                      top: {
                        value: 6,
                        unit: 'px',
                      },
                      right: {
                        value: 12,
                        unit: 'px',
                      },
                      bottom: {
                        value: 6,
                        unit: 'px',
                      },
                      left: {
                        value: 12,
                        unit: 'px',
                      },
                    },
                  },
                ],
              },
            ],
            props: [
              {
                type: 'padding',
                value: {
                  top: {
                    value: 16,
                    unit: 'px',
                  },
                  right: {
                    value: 16,
                    unit: 'px',
                  },
                  bottom: {
                    value: 16,
                    unit: 'px',
                  },
                  left: {
                    value: 16,
                    unit: 'px',
                  },
                },
              },
              {
                type: 'margin',
                value: {
                  top: {
                    value: 0,
                    unit: 'px',
                  },
                  right: {
                    value: 0,
                    unit: 'px',
                  },
                  bottom: {
                    value: 8,
                    unit: 'px',
                  },
                  left: {
                    value: 0,
                    unit: 'px',
                  },
                },
              },
              {
                type: 'bgColor',
                value: '#FFFFFF',
              },
              {
                type: 'color',
                value: '#494949',
              },
              {
                type: 'borderWidth',
                value: {
                  value: 1,
                  unit: 'px',
                },
              },
              {
                type: 'borderColor',
                value: '#00000019',
              },
              {
                type: 'borderRadius',
                value: {
                  topLeft: {
                    value: 8,
                    unit: 'px',
                  },
                  topRight: {
                    value: 8,
                    unit: 'px',
                  },
                  bottomLeft: {
                    value: 8,
                    unit: 'px',
                  },
                  bottomRight: {
                    value: 8,
                    unit: 'px',
                  },
                },
              },
              {
                type: 'boxShadow',
                value: [
                  {
                    x: {
                      value: 0,
                      unit: 'px',
                    },
                    y: {
                      value: 4,
                      unit: 'px',
                    },
                    blur: {
                      value: 6,
                      unit: 'px',
                    },
                    spread: {
                      value: 0,
                      unit: 'px',
                    },
                    color: '#00000019',
                    inset: false,
                  },
                  {
                    x: {
                      value: 0,
                      unit: 'px',
                    },
                    y: {
                      value: 2,
                      unit: 'px',
                    },
                    blur: {
                      value: 4,
                      unit: 'px',
                    },
                    spread: {
                      value: -2,
                      unit: 'px',
                    },
                    color: '#00000019',
                    inset: false,
                  },
                ],
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
