import { type FormSchema } from '@efie-form/react';

export const sampleSchema: FormSchema = {
  version: '1.0.0',
  form: {
    fields: [
      {
        id: 'page-1',
        type: 'page',
        children: [
          {
            id: '45zg2myuk6',
            type: 'block',
            children: [
              {
                id: 'conference-image',
                type: 'image',
                props: [
                  {
                    type: 'src',
                    value: 'https://github.blog/wp-content/uploads/2025/04/1200x630-Universe_Blog_Banner.jpg?w=1024',
                  },
                  {
                    type: 'alt',
                    value: 'Tech Conference 2025 Banner',
                  },
                  {
                    type: 'width',
                    value: {
                      type: 'percentage',
                      value: 100,
                    },
                  },
                  {
                    type: 'objectFit',
                    value: 'cover',
                  },
                  {
                    type: 'textAlign',
                    value: 'center',
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
                    value: 0,
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
                    r: 73,
                    g: 73,
                    b: 73,
                    a: 1,
                  },
                  hsla: {
                    h: 0,
                    s: 0,
                    l: 29,
                    a: 1,
                  },
                  hex: '#494949',
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
          {
            id: 'j9drcolejg',
            type: 'block',
            children: [
              {
                id: 'heading-1',
                type: 'heading',
                props: [
                  {
                    type: 'tag',
                    value: 'h1',
                  },
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
                                text: 'Tech Conference 2025 Registration',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    type: 'textAlign',
                    value: 'center',
                  },
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 37,
                        g: 99,
                        b: 235,
                        a: 1,
                      },
                      hsla: {
                        h: 221,
                        s: 83,
                        l: 53,
                        a: 1,
                      },
                      hex: '#2563eb',
                    },
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 32,
                      unit: 'px',
                    },
                  },
                ],
              },
              {
                id: 'intro-paragraph',
                type: 'paragraph',
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
                                text: 'Join us for the most innovative tech conference of the year! Register now to secure your spot and connect with industry leaders, attend cutting-edge workshops, and discover the latest technological breakthroughs.',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    type: 'textAlign',
                    value: 'center',
                  },
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 100,
                        g: 116,
                        b: 139,
                        a: 1,
                      },
                      hsla: {
                        h: 215,
                        s: 16,
                        l: 47,
                        a: 1,
                      },
                      hex: '#64748b',
                    },
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 18,
                      unit: 'px',
                    },
                  },
                ],
              },
              {
                type: 'divider',
                id: 'rgieykerm3',
                props: [
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 173,
                        g: 173,
                        b: 173,
                        a: 1,
                      },
                      hsla: {
                        h: 0,
                        s: 0,
                        l: 68,
                        a: 1,
                      },
                      hex: '#ADADAD',
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
                id: 'personal-info-heading',
                type: 'heading',
                props: [
                  {
                    type: 'tag',
                    value: 'h2',
                  },
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
                                text: 'Personal Information',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 30,
                        g: 41,
                        b: 59,
                        a: 1,
                      },
                      hsla: {
                        h: 217,
                        s: 33,
                        l: 17,
                        a: 1,
                      },
                      hex: '#1e293b',
                    },
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 20,
                      unit: 'px',
                    },
                  },
                ],
              },
              {
                id: 'name-row',
                type: 'row',
                children: [
                  {
                    id: 'first-name-column',
                    type: 'column',
                    children: [
                      {
                        id: 'first-name',
                        type: 'short_text',
                        form: {
                          key: 'firstName',
                        },
                        props: [
                          {
                            type: 'label',
                            value: 'First Name',
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
                    props: [
                      {
                        type: 'width',
                        value: {
                          type: 'percentage',
                          value: 50,
                        },
                      },
                    ],
                  },
                  {
                    id: 'last-name-column',
                    type: 'column',
                    children: [
                      {
                        id: 'last-name',
                        type: 'short_text',
                        form: {
                          key: 'lastName',
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
                            value: true,
                          },
                        ],
                      },
                    ],
                    props: [
                      {
                        type: 'width',
                        value: {
                          type: 'percentage',
                          value: 50,
                        },
                      },
                    ],
                  },
                ],
                props: [
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
                id: 'email',
                type: 'short_text',
                form: {
                  key: 'email',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Email Address',
                  },
                  {
                    type: 'placeholder',
                    value: 'your.email@example.com',
                  },
                  {
                    type: 'required',
                    value: true,
                  },
                ],
              },
              {
                id: 'phone',
                type: 'short_text',
                form: {
                  key: 'phone',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Phone Number',
                  },
                  {
                    type: 'placeholder',
                    value: '+1 (555) 123-4567',
                  },
                  {
                    type: 'required',
                    value: false,
                  },
                ],
              },
              {
                id: 'age',
                type: 'number',
                form: {
                  key: 'age',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Age',
                  },
                  {
                    type: 'placeholder',
                    value: 'Enter your age',
                  },
                  {
                    type: 'required',
                    value: true,
                  },
                ],
              },
              {
                type: 'divider',
                id: '0n4vuvsgj4',
                props: [
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 177,
                        g: 177,
                        b: 177,
                        a: 1,
                      },
                      hsla: {
                        h: 0,
                        s: 0,
                        l: 70,
                        a: 1,
                      },
                      hex: '#B1B1B1',
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
                id: 'preferences-heading',
                type: 'heading',
                props: [
                  {
                    type: 'tag',
                    value: 'h2',
                  },
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
                                text: 'Conference Preferences',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 30,
                        g: 41,
                        b: 59,
                        a: 1,
                      },
                      hsla: {
                        h: 217,
                        s: 33,
                        l: 17,
                        a: 1,
                      },
                      hex: '#1e293b',
                    },
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 20,
                      unit: 'px',
                    },
                  },
                ],
              },
              {
                id: 'experience-level',
                type: 'single_choice',
                form: {
                  key: 'experienceLevel',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Experience Level',
                  },
                  {
                    type: 'options',
                    value: [
                      {
                        label: 'Beginner (0-2 years)',
                        value: 'beginner',
                      },
                      {
                        label: 'Intermediate (3-5 years)',
                        value: 'intermediate',
                      },
                      {
                        label: 'Advanced (6-10 years)',
                        value: 'advanced',
                      },
                      {
                        label: 'Expert (10+ years)',
                        value: 'expert',
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
                id: 'interests',
                type: 'multiple_choices',
                form: {
                  key: 'interests',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Topics of Interest (Select all that apply)',
                  },
                  {
                    type: 'options',
                    value: [
                      {
                        label: 'Artificial Intelligence & Machine Learning',
                        value: 'ai-ml',
                      },
                      {
                        label: 'Cloud Computing & DevOps',
                        value: 'cloud-devops',
                      },
                      {
                        label: 'Web Development & Frontend',
                        value: 'web-frontend',
                      },
                      {
                        label: 'Mobile Development',
                        value: 'mobile',
                      },
                      {
                        label: 'Cybersecurity',
                        value: 'cybersecurity',
                      },
                      {
                        label: 'Data Science & Analytics',
                        value: 'data-science',
                      },
                      {
                        label: 'Blockchain & Cryptocurrency',
                        value: 'blockchain',
                      },
                      {
                        label: 'Internet of Things (IoT)',
                        value: 'iot',
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
                id: 'special-requirements',
                type: 'long_text',
                form: {
                  key: 'specialRequirements',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Special Requirements or Dietary Restrictions',
                  },
                  {
                    type: 'placeholder',
                    value: 'Please describe any accessibility needs, dietary restrictions, or other special requirements...',
                  },
                  {
                    type: 'required',
                    value: false,
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
                    r: 73,
                    g: 73,
                    b: 73,
                    a: 1,
                  },
                  hsla: {
                    h: 0,
                    s: 0,
                    l: 29,
                    a: 1,
                  },
                  hex: '#494949',
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
            type: 'width',
            value: {
              type: 'percentage',
              value: 100,
            },
          },
          {
            type: 'pageName',
            value: 'Registration Details',
          },
        ],
      },
      {
        id: 'page-2',
        type: 'page',
        children: [
          {
            id: 'schedule-heading',
            type: 'heading',
            props: [
              {
                type: 'tag',
                value: 'h1',
              },
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
                            text: 'Event Schedule & Documents',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                type: 'textAlign',
                value: 'center',
              },
              {
                type: 'color',
                value: {
                  rgba: {
                    r: 37,
                    g: 99,
                    b: 235,
                    a: 1,
                  },
                  hsla: {
                    h: 221,
                    s: 83,
                    l: 53,
                    a: 1,
                  },
                  hex: '#2563eb',
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
            ],
          },
          {
            id: 'schedule-block',
            type: 'block',
            children: [
              {
                id: 'schedule-info-heading',
                type: 'heading',
                props: [
                  {
                    type: 'tag',
                    value: 'h2',
                  },
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
                                text: 'Schedule & Timing',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 30,
                        g: 41,
                        b: 59,
                        a: 1,
                      },
                      hsla: {
                        h: 217,
                        s: 33,
                        l: 17,
                        a: 1,
                      },
                      hex: '#1e293b',
                    },
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 20,
                      unit: 'px',
                    },
                  },
                ],
              },
              {
                id: 'event-date',
                type: 'date',
                form: {
                  key: 'eventDate',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Preferred Conference Date',
                  },
                  {
                    type: 'required',
                    value: true,
                  },
                ],
              },
              {
                id: 'arrival-time',
                type: 'time',
                form: {
                  key: 'arrivalTime',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Expected Arrival Time',
                  },
                  {
                    type: 'required',
                    value: true,
                  },
                ],
              },
              {
                id: 'departure-datetime',
                type: 'date_time',
                form: {
                  key: 'departureDateTime',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Departure Date & Time',
                  },
                  {
                    type: 'required',
                    value: false,
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
                    value: 8,
                    unit: 'px',
                  },
                  right: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                  bottom: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                  left: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                },
              },
              {
                type: 'backgroundColor',
                value: {
                  rgba: {
                    r: 254,
                    g: 243,
                    b: 199,
                    a: 1,
                  },
                  hsla: {
                    h: 48,
                    s: 96,
                    l: 89,
                    a: 1,
                  },
                  hex: '#fef3c7',
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
            ],
          },
          {
            id: 'documents-block',
            type: 'block',
            children: [
              {
                id: 'documents-heading',
                type: 'heading',
                props: [
                  {
                    type: 'tag',
                    value: 'h2',
                  },
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
                                text: 'Required Documents',
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    type: 'color',
                    value: {
                      rgba: {
                        r: 30,
                        g: 41,
                        b: 59,
                        a: 1,
                      },
                      hsla: {
                        h: 217,
                        s: 33,
                        l: 17,
                        a: 1,
                      },
                      hex: '#1e293b',
                    },
                  },
                  {
                    type: 'fontSize',
                    value: {
                      type: 'length',
                      value: 20,
                      unit: 'px',
                    },
                  },
                ],
              },
              {
                id: 'profile-photo',
                type: 'file',
                form: {
                  key: 'profilePhoto',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Profile Photo',
                  },
                  {
                    type: 'accept',
                    value: {
                      allowAll: false,
                      formats: [
                        'image/*',
                      ],
                    },
                  },
                  {
                    type: 'maxFiles',
                    value: 1,
                  },
                  {
                    type: 'required',
                    value: true,
                  },
                ],
              },
              {
                id: 'supporting-documents',
                type: 'file',
                form: {
                  key: 'supportingDocuments',
                },
                props: [
                  {
                    type: 'label',
                    value: 'Supporting Documents (Resume, Portfolio, etc.)',
                  },
                  {
                    type: 'accept',
                    value: {
                      allowAll: false,
                      formats: [
                        '.pdf',
                        '.doc',
                        '.docx',
                        '.txt',
                      ],
                    },
                  },
                  {
                    type: 'maxFiles',
                    value: 5,
                  },
                  {
                    type: 'required',
                    value: false,
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
                    value: 8,
                    unit: 'px',
                  },
                  right: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                  bottom: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                  left: {
                    type: 'length',
                    value: 8,
                    unit: 'px',
                  },
                },
              },
              {
                type: 'backgroundColor',
                value: {
                  rgba: {
                    r: 240,
                    g: 253,
                    b: 244,
                    a: 1,
                  },
                  hsla: {
                    h: 138,
                    s: 76,
                    l: 97,
                    a: 1,
                  },
                  hex: '#f0fdf4',
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
                type: 'borderStyle',
                value: 'dashed',
              },
              {
                type: 'borderWidth',
                value: {
                  type: 'length',
                  value: 2,
                  unit: 'px',
                },
              },
              {
                type: 'borderColor',
                value: {
                  rgba: {
                    r: 22,
                    g: 163,
                    b: 74,
                    a: 1,
                  },
                  hsla: {
                    h: 142,
                    s: 76,
                    l: 36,
                    a: 1,
                  },
                  hex: '#16a34a',
                },
              },
            ],
          },
          {
            id: 'divider-2',
            type: 'divider',
            props: [
              {
                type: 'color',
                value: {
                  rgba: {
                    r: 148,
                    g: 163,
                    b: 184,
                    a: 1,
                  },
                  hsla: {
                    h: 215,
                    s: 20,
                    l: 65,
                    a: 1,
                  },
                  hex: '#94a3b8',
                },
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
              {
                type: 'borderStyle',
                value: 'dotted',
              },
            ],
          },
          {
            id: 'action-buttons-row',
            type: 'row',
            children: [
              {
                id: 'submit-column',
                type: 'column',
                children: [
                  {
                    id: 'submit-button',
                    type: 'button',
                    props: [
                      {
                        type: 'label',
                        value: 'Submit Registration',
                      },
                      {
                        type: 'width',
                        value: {
                          type: 'percentage',
                          value: 100,
                        },
                      },
                      {
                        type: 'backgroundColor',
                        value: {
                          rgba: {
                            r: 37,
                            g: 99,
                            b: 235,
                            a: 1,
                          },
                          hsla: {
                            h: 221,
                            s: 83,
                            l: 53,
                            a: 1,
                          },
                          hex: '#2563eb',
                        },
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
                          hex: '#ffffff',
                        },
                      },
                      {
                        type: 'textAlign',
                        value: 'center',
                      },
                      {
                        type: 'fontSize',
                        value: {
                          type: 'length',
                          value: 18,
                          unit: 'px',
                        },
                      },
                      {
                        type: 'fontWeight',
                        value: 600,
                      },
                      {
                        type: 'buttonAction',
                        value: {
                          action: 'submit',
                        },
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
                        type: 'borderStyle',
                        value: 'none',
                      },
                      {
                        type: 'padding',
                        value: {
                          top: {
                            type: 'length',
                            value: 12,
                            unit: 'px',
                          },
                          right: {
                            type: 'length',
                            value: 16,
                            unit: 'px',
                          },
                          bottom: {
                            type: 'length',
                            value: 12,
                            unit: 'px',
                          },
                          left: {
                            type: 'length',
                            value: 16,
                            unit: 'px',
                          },
                        },
                      },
                    ],
                  },
                ],
                props: [
                  {
                    type: 'width',
                    value: {
                      type: 'percentage',
                      value: 50,
                    },
                  },
                ],
              },
              {
                id: 'reset-column',
                type: 'column',
                children: [
                  {
                    id: 'reset-button',
                    type: 'button',
                    props: [
                      {
                        type: 'label',
                        value: 'Reset Form',
                      },
                      {
                        type: 'width',
                        value: {
                          type: 'percentage',
                          value: 100,
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
                          hex: '#ffffff',
                        },
                      },
                      {
                        type: 'color',
                        value: {
                          rgba: {
                            r: 55,
                            g: 65,
                            b: 81,
                            a: 1,
                          },
                          hsla: {
                            h: 217,
                            s: 19,
                            l: 27,
                            a: 1,
                          },
                          hex: '#374151',
                        },
                      },
                      {
                        type: 'textAlign',
                        value: 'center',
                      },
                      {
                        type: 'fontSize',
                        value: {
                          type: 'length',
                          value: 18,
                          unit: 'px',
                        },
                      },
                      {
                        type: 'fontWeight',
                        value: 500,
                      },
                      {
                        type: 'buttonAction',
                        value: {
                          action: 'submit',
                        },
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
                        type: 'borderStyle',
                        value: 'solid',
                      },
                      {
                        type: 'padding',
                        value: {
                          top: {
                            type: 'length',
                            value: 12,
                            unit: 'px',
                          },
                          right: {
                            type: 'length',
                            value: 16,
                            unit: 'px',
                          },
                          bottom: {
                            type: 'length',
                            value: 12,
                            unit: 'px',
                          },
                          left: {
                            type: 'length',
                            value: 16,
                            unit: 'px',
                          },
                        },
                      },
                    ],
                  },
                ],
                props: [
                  {
                    type: 'width',
                    value: {
                      type: 'percentage',
                      value: 50,
                    },
                  },
                ],
              },
            ],
            props: [
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
            id: 'footer-paragraph',
            type: 'paragraph',
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
                            text: 'Thank you for registering for Tech Conference 2025! We look forward to seeing you there. If you have any questions, please contact us at support@techconference2025.com',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                type: 'textAlign',
                value: 'center',
              },
              {
                type: 'color',
                value: {
                  rgba: {
                    r: 100,
                    g: 116,
                    b: 139,
                    a: 1,
                  },
                  hsla: {
                    h: 215,
                    s: 16,
                    l: 47,
                    a: 1,
                  },
                  hex: '#64748b',
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
            ],
          },
        ],
        props: [
          {
            type: 'width',
            value: {
              type: 'percentage',
              value: 100,
            },
          },
          {
            type: 'pageName',
            value: 'Schedule & Documents',
          },
        ],
      },
    ],
    rules: [],
  },
};
