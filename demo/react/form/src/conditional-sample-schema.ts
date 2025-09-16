import type { FormSchema } from '@efie-form/react';

export const conditionalSampleSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        sys: {
          id: 'main_page',
          type: 'page',
          name: 'main_page',
        },
        children: [
          {
            sys: {
              type: 'heading',
              id: 'title_heading',
              name: 'title_heading',
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
                            text: 'Conditional Form Example',
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
              id: 'has_experience',
              type: 'single_choice',
              name: 'has_experience',
            },
            form: {
              name: 'has_experience',
            },
            props: [
              {
                type: 'label',
                value: 'Do you have experience with forms?',
              },
              {
                type: 'options',
                value: [
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ],
              },
            ],
          },
          {
            sys: {
              id: 'experience_years',
              type: 'number',
              name: 'experience_years',
            },
            form: {
              name: 'experience_years',
            },
            props: [
              {
                type: 'label',
                value: 'How many years of experience do you have?',
              },
              {
                type: 'placeholder',
                value: 'Enter number of years',
              },
            ],
          },
          {
            sys: {
              id: 'beginner_help',
              type: 'long_text',
              name: 'beginner_help',
            },
            form: {
              name: 'beginner_help',
            },
            props: [
              {
                type: 'label',
                value: 'What kind of help do you need to get started?',
              },
              {
                type: 'placeholder',
                value: 'Describe what help you need...',
              },
            ],
          },
          {
            sys: {
              id: 'advanced_tools',
              type: 'multiple_choices',
              name: 'advanced_tools',
            },
            form: {
              name: 'advanced_tools',
            },
            props: [
              {
                type: 'label',
                value: 'Which advanced tools are you interested in?',
              },
              {
                type: 'options',
                value: [
                  { label: 'Advanced Validation', value: 'validation' },
                  { label: 'Conditional Logic', value: 'conditional' },
                  { label: 'API Integrations', value: 'integrations' },
                  { label: 'Form Analytics', value: 'analytics' },
                ],
              },
            ],
          },
          {
            sys: {
              id: 'submit_button',
              type: 'button',
              name: 'submit_button',
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
    rules: [
      {
        id: 'show_experience_years',
        enabled: true,
        triggers: ['onChange'],
        when: {
          logic: 'all',
          children: [
            {
              left: { kind: 'fieldValue', field: 'has_experience' },
              operator: 'equal',
              right: { kind: 'constant', value: 'yes' },
            },
          ],
        },
        actions: [
          {
            id: 'show_experience_years_action',
            type: 'show_fields',
            fields: ['experience_years'],
          },
        ],
      },
      {
        id: 'hide_experience_years',
        enabled: true,
        triggers: ['onChange'],
        when: {
          logic: 'all',
          children: [
            {
              left: { kind: 'fieldValue', field: 'has_experience' },
              operator: 'not_equal',
              right: { kind: 'constant', value: 'yes' },
            },
          ],
        },
        actions: [
          {
            id: 'hide_experience_years_action',
            type: 'hide_fields',
            fields: ['experience_years'],
          },
        ],
      },
      {
        id: 'show_beginner_help',
        enabled: true,
        triggers: ['onChange'],
        when: {
          logic: 'all',
          children: [
            {
              left: { kind: 'fieldValue', field: 'has_experience' },
              operator: 'equal',
              right: { kind: 'constant', value: 'no' },
            },
          ],
        },
        actions: [
          {
            id: 'show_beginner_help_action',
            type: 'show_fields',
            fields: ['beginner_help'],
          },
          {
            id: 'require_beginner_help_action',
            type: 'set_required',
            fields: ['beginner_help'],
            value: true,
          },
        ],
      },
      {
        id: 'hide_beginner_help',
        enabled: true,
        triggers: ['onChange'],
        when: {
          logic: 'all',
          children: [
            {
              left: { kind: 'fieldValue', field: 'has_experience' },
              operator: 'equal',
              right: { kind: 'constant', value: 'yes' },
            },
          ],
        },
        actions: [
          {
            id: 'hide_beginner_help_action',
            type: 'hide_fields',
            fields: ['beginner_help'],
          },
        ],
      },
      {
        id: 'show_advanced_tools',
        enabled: true,
        triggers: ['onChange'],
        when: {
          logic: 'all',
          children: [
            {
              left: { kind: 'fieldValue', field: 'experience_years' },
              operator: 'greater_than',
              right: { kind: 'constant', value: 2 },
            },
          ],
        },
        actions: [
          {
            id: 'show_advanced_tools_action',
            type: 'show_fields',
            fields: ['advanced_tools'],
          },
        ],
      },
      {
        id: 'hide_advanced_tools',
        enabled: true,
        triggers: ['onChange'],
        when: {
          logic: 'any',
          children: [
            {
              left: { kind: 'fieldValue', field: 'experience_years' },
              operator: 'is_empty',
            },
            {
              left: { kind: 'fieldValue', field: 'experience_years' },
              operator: 'less_than_or_equal',
              right: { kind: 'constant', value: 2 },
            },
          ],
        },
        actions: [
          {
            id: 'hide_advanced_tools_action',
            type: 'hide_fields',
            fields: ['advanced_tools'],
          },
        ],
      },
    ],
  },
};
