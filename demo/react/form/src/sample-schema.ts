import { type FormSchema } from '@efie-form/react';

export const sampleSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'YeLBRjSODi',
        type: 'page',
        children: [
          {
            id: 'UPoiuQseYY',
            type: 'block',
            children: [
              {
                type: 'header',
                id: 'fVNvXQnKCS',
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
                id: 'lALTvFtwVJ',
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
                type: 'row',
                id: 'gbmAYEjGyS',
                props: [],
                children: [
                  {
                    id: 'uXwBNYlYXg',
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
                        id: 'QGeXsGUtIY',
                        type: 'short_text',
                        form: {
                          key: '',
                        },
                        props: [
                          {
                            type: 'label',
                            value: 'First name',
                          },
                          {
                            type: 'placeholder',
                            value: 'Enter your first name',
                          },
                          {
                            type: 'required',
                            value: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'DfopFwvXgG',
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
                        id: 'EXYzbnGTZf',
                        type: 'short_text',
                        form: {
                          key: '',
                        },
                        props: [
                          {
                            type: 'label',
                            value: 'Last name',
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
                id: 'beDGOJDhlJ',
                type: 'short_text',
                form: {
                  key: '',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Address line',
                  },
                  {
                    type: 'placeholder',
                    value: 'Enter your full address',
                  },
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
              {
                type: 'single_choice',
                id: 'eTfPfJASgT',
                form: {
                  key: '',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Coutry',
                  },
                  {
                    type: 'options',
                    value: [
                      {
                        label: 'Malaysia',
                        value: 'Malaysia',
                      },
                      {
                        label: 'Singapore',
                        value: 'Singapore',
                      },
                      {
                        label: 'China',
                        value: 'China',
                      },
                    ],
                  },
                  {
                    type: 'required',
                    value: true,
                  },
                ],
              },
              {
                type: 'paragraph',
                id: 'harPFrzhzs',
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
                type: 'row',
                id: 'QpFMAWUhoC',
                props: [],
                children: [
                  {
                    id: 'UWSAoUblZy',
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
                        id: 'IjPhzMgXYj',
                        type: 'short_text',
                        form: {
                          key: '',
                        },
                        props: [
                          {
                            type: 'label',
                            value: 'Name on card',
                          },
                          {
                            type: 'placeholder',
                            value: '',
                          },
                          {
                            type: 'required',
                            value: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'WVFSYgpCGi',
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
                        id: 'yGYCuVfkLb',
                        type: 'short_text',
                        form: {
                          key: '',
                        },
                        props: [
                          {
                            type: 'label',
                            value: 'Card number',
                          },
                          {
                            type: 'placeholder',
                            value: '',
                          },
                          {
                            type: 'required',
                            value: true,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'row',
                id: 'VCMMkfIEfz',
                props: [],
                children: [
                  {
                    id: 'frTHLgRNTd',
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
                        id: 'KTJubPiQwC',
                        type: 'short_text',
                        form: {
                          key: '',
                        },
                        props: [
                          {
                            type: 'label',
                            value: 'Expire date',
                          },
                          {
                            type: 'placeholder',
                            value: '',
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
                    id: 'ellaKvePBQ',
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
                        id: 'sKqCtjwSva',
                        type: 'short_text',
                        form: {
                          key: '',
                        },
                        props: [
                          {
                            type: 'label',
                            value: 'CVV',
                          },
                          {
                            type: 'placeholder',
                            value: '',
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
                id: 'QAwbXUScoP',
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
