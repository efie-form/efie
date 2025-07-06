import { type FormSchema } from '@efie-form/react';

export const schema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'ZkxlgQECao',
        type: 'page',
        children: [
          {
            id: 'CaEGYYscsC',
            type: 'block',
            children: [
              {
                type: 'heading',
                id: 'xq5sgm0bgp',
                props: [
                  {
                    type: 'content',
                    value: {
                      jsonContent: {
                        type: 'doc',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              {
                                type: 'text',
                                text: 'Heading',
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
                type: 'paragraph',
                id: '1ffzp7yl6f',
                props: [
                  {
                    type: 'content',
                    value: {
                      jsonContent: {
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
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 16,
                      unit: 'px',
                    },
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
                type: 'row',
                id: '92n026prit',
                props: [],
                children: [
                  {
                    id: 'kZvDZRJJSB',
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
                        id: 'h3e05jyhh8',
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
                            value: 'Enter the your first name',
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
                    id: 'dwZeEJFAky',
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
                        id: 'vpwjq0qccj',
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
                            value: 'Enter the last name',
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
                id: 'arc822zgbb',
                type: 'short_text',
                form: {
                  key: '',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Address',
                  },
                  {
                    type: 'placeholder',
                    value: 'Enter the your full address',
                  },
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
              {
                type: 'single_choice',
                id: 'oftp1d2jer',
                form: {
                  key: '',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Country',
                  },
                  {
                    type: 'options',
                    value: [
                      {
                        label: 'China',
                        value: 'Option 1',
                      },
                      {
                        label: 'Malaysia',
                        value: 'Option 2',
                      },
                      {
                        label: 'Singapore',
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
              {
                type: 'divider',
                id: 'kb8xi4mfad',
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
                type: 'paragraph',
                id: '330kamj6v0',
                props: [
                  {
                    type: 'content',
                    value: {
                      jsonContent: {
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
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 14,
                      unit: 'px',
                    },
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
                    value: 'left',
                  },
                ],
              },
              {
                id: 'cwtzebg5fs',
                type: 'button',
                props: [
                  {
                    type: 'label',
                    value: 'Submit',
                  },
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 1,
                      },
                      hsla: {
                        h: 0,
                        s: 0,
                        l: 100,
                        a: 1,
                      },
                      hex: '#FFFFFF',
                    },
                  },
                  {
                    type: 'backgroundColor',
                    value: {
                      rgba: {
                        r: 80,
                        g: 131,
                        b: 167,
                        a: 1,
                      },
                      hsla: {
                        h: 205,
                        s: 35,
                        l: 48,
                        a: 1,
                      },
                      hex: '#5083a7',
                    },
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 16,
                      unit: 'px',
                    },
                  },
                  {
                    type: 'width',
                    value: {
                      type: 'auto',
                    },
                  },
                  {
                    type: 'buttonAction',
                    value: {
                      action: 'submit',
                    },
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
                        type: 'length',
                        value: 6,
                        unit: 'px',
                      },
                      topRight: {
                        type: 'length',
                        value: 6,
                        unit: 'px',
                      },
                      bottomLeft: {
                        type: 'length',
                        value: 6,
                        unit: 'px',
                      },
                      bottomRight: {
                        type: 'length',
                        value: 6,
                        unit: 'px',
                      },
                    },
                  },
                  {
                    type: 'padding',
                    value: {
                      top: {
                        type: 'length',
                        value: 6,
                        unit: 'px',
                      },
                      right: {
                        type: 'length',
                        value: 12,
                        unit: 'px',
                      },
                      bottom: {
                        type: 'length',
                        value: 6,
                        unit: 'px',
                      },
                      left: {
                        type: 'length',
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
                    type: 'length',
                    value: 16,
                    unit: 'px',
                  },
                  right: {
                    type: 'length',
                    value: 16,
                    unit: 'px',
                  },
                  bottom: {
                    type: 'length',
                    value: 16,
                    unit: 'px',
                  },
                  left: {
                    type: 'length',
                    value: 16,
                    unit: 'px',
                  },
                },
              },
              {
                type: 'margin',
                value: {
                  top: {
                    type: 'length',
                    value: 0,
                    unit: 'px',
                  },
                  right: {
                    type: 'length',
                    value: 0,
                    unit: 'px',
                  },
                  bottom: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                  left: {
                    type: 'length',
                    value: 0,
                    unit: 'px',
                  },
                },
              },
              {
                type: 'backgroundColor',
                value: {
                  rgba: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 1,
                  },
                  hsla: {
                    h: 0,
                    s: 0,
                    l: 100,
                    a: 1,
                  },
                  hex: '#FFFFFF',
                },
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
                type: 'borderWidth',
                value: {
                  type: 'length',
                  value: 1,
                  unit: 'px',
                },
              },
              {
                type: 'borderColor',
                value: {
                  rgba: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0.098_039_215_686_274_51,
                  },
                  hsla: {
                    h: 0,
                    s: 0,
                    l: 0,
                    a: 0.098_039_215_686_274_51,
                  },
                  hex: '#00000019',
                },
              },
              {
                type: 'borderRadius',
                value: {
                  topLeft: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                  topRight: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                  bottomLeft: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                  bottomRight: {
                    type: 'length',
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
                      type: 'length',
                      value: 0,
                      unit: 'px',
                    },
                    y: {
                      type: 'length',
                      value: 4,
                      unit: 'px',
                    },
                    blur: {
                      type: 'length',
                      value: 6,
                      unit: 'px',
                    },
                    spread: {
                      type: 'length',
                      value: 0,
                      unit: 'px',
                    },
                    color: {
                      rgba: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0.098_039_215_686_274_51,
                      },
                      hsla: {
                        h: 0,
                        s: 0,
                        l: 0,
                        a: 0.098_039_215_686_274_51,
                      },
                      hex: '#00000019',
                    },
                    inset: false,
                  },
                  {
                    x: {
                      type: 'length',
                      value: 0,
                      unit: 'px',
                    },
                    y: {
                      type: 'length',
                      value: 2,
                      unit: 'px',
                    },
                    blur: {
                      type: 'length',
                      value: 4,
                      unit: 'px',
                    },
                    spread: {
                      type: 'length',
                      value: -2,
                      unit: 'px',
                    },
                    color: {
                      rgba: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0.098_039_215_686_274_51,
                      },
                      hsla: {
                        h: 0,
                        s: 0,
                        l: 0,
                        a: 0.098_039_215_686_274_51,
                      },
                      hex: '#00000019',
                    },
                    inset: false,
                  },
                ],
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
    ],
    rules: [],
  },
};
