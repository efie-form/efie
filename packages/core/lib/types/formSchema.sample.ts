import type { FormSchema } from './formSchema.type';
import {
  FormFieldType,
  PropertyType,
  RuleType,
  ActionType,
  DisplayPosition,
  TextAlign,
  ObjectFit,
  ButtonType,
  DividerStyle,
} from './formSchema.constant';

export const sampleFormSchema: FormSchema = {
  version: '1.0',
  form: {
    fields: [
      // Header with rich text
      {
        type: FormFieldType.HEADER,
        id: 'welcome',
        props: [
          {
            type: PropertyType.CONTENT,
            label: 'Welcome Header',
            content: {
              type: 'doc',
              content: [
                {
                  type: 'heading',
                  attrs: { level: 2 },
                  content: [{ type: 'text', text: 'Welcome to Our Form' }],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Please fill out the following information. ',
                    },
                    {
                      type: 'text',
                      marks: [{ type: 'bold' }],
                      text: 'Required fields are marked with an asterisk.',
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // All Field Types Demo Section
      {
        type: FormFieldType.HEADER,
        id: 'fieldTypesDemo',
        props: [
          {
            type: PropertyType.CONTENT,
            label: 'Field Types Demo',
            content: {
              type: 'doc',
              content: [
                {
                  type: 'heading',
                  attrs: { level: 3 },
                  content: [
                    { type: 'text', text: 'All Available Field Types' },
                  ],
                },
              ],
            },
          },
        ],
      },

      // Text Input Fields
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'shortText',
        props: [
          {
            type: PropertyType.TEXT,
            label: 'Short Text Input',
            placeholder: 'Enter short text',
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.LONG_TEXT,
        id: 'longText',
        props: [
          {
            type: PropertyType.TEXT,
            label: 'Long Text Input',
            placeholder: 'Enter long text',
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.NUMBER,
        id: 'number',
        props: [
          {
            type: PropertyType.NUMBER,
            label: 'Number Input',
            placeholder: 'Enter a number',
            min: 0,
            max: 100,
            isRequired: true,
          },
        ],
      },

      // Choice Fields
      {
        type: FormFieldType.SINGLE_CHOICE,
        id: 'singleChoice',
        props: [
          {
            type: PropertyType.CHOICE,
            label: 'Single Choice',
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ],
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.MULTIPLE_CHOICES,
        id: 'multipleChoices',
        props: [
          {
            type: PropertyType.CHOICES,
            label: 'Multiple Choices',
            options: [
              { label: 'Choice 1', value: '1' },
              { label: 'Choice 2', value: '2' },
              { label: 'Choice 3', value: '3' },
            ],
            isRequired: true,
          },
        ],
      },

      // Date/Time Fields
      {
        type: FormFieldType.DATE,
        id: 'date',
        props: [
          {
            type: PropertyType.DATE,
            label: 'Date',
            format: 'YYYY-MM-DD',
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.TIME,
        id: 'time',
        props: [
          {
            type: PropertyType.TIME,
            label: 'Time',
            format: 'HH:mm',
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.DATE_TIME,
        id: 'dateTime',
        props: [
          {
            type: PropertyType.DATE_TIME,
            label: 'Date and Time',
            format: 'YYYY-MM-DD HH:mm',
            isRequired: true,
          },
        ],
      },

      // File Field
      {
        type: FormFieldType.FILE,
        id: 'file',
        props: [
          {
            type: PropertyType.FILE,
            label: 'File Upload',
            accept: '.pdf,.doc,.docx',
            multiple: true,
            isRequired: true,
          },
        ],
      },

      // Layout Fields
      {
        type: FormFieldType.ROW,
        id: 'row',
        props: [
          {
            type: PropertyType.ROW,
            label: 'Row Layout',
          },
        ],
        children: [
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'rowField1',
            props: [
              {
                type: PropertyType.TEXT,
                label: 'Row Field 1',
              },
            ],
          },
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'rowField2',
            props: [
              {
                type: PropertyType.TEXT,
                label: 'Row Field 2',
              },
            ],
          },
        ],
      },
      {
        type: FormFieldType.COLUMN,
        id: 'column',
        props: [
          {
            type: PropertyType.COLUMN,
            label: 'Column Layout',
          },
        ],
        children: [
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'columnField1',
            props: [
              {
                type: PropertyType.TEXT,
                label: 'Column Field 1',
              },
            ],
          },
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'columnField2',
            props: [
              {
                type: PropertyType.TEXT,
                label: 'Column Field 2',
              },
            ],
          },
        ],
      },
      {
        type: FormFieldType.BLOCK,
        id: 'block',
        props: [
          {
            type: PropertyType.BLOCK,
            label: 'Block Layout',
          },
        ],
        children: [
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'blockField1',
            props: [
              {
                type: PropertyType.TEXT,
                label: 'Block Field 1',
              },
            ],
          },
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'blockField2',
            props: [
              {
                type: PropertyType.TEXT,
                label: 'Block Field 2',
              },
            ],
          },
        ],
      },

      // Content Fields
      {
        type: FormFieldType.PARAGRAPH,
        id: 'paragraph',
        props: [
          {
            type: PropertyType.CONTENT,
            label: 'Paragraph',
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    { type: 'text', text: 'This is a paragraph with ' },
                    {
                      type: 'text',
                      marks: [{ type: 'bold' }],
                      text: 'formatted text',
                    },
                    { type: 'text', text: ' and ' },
                    {
                      type: 'text',
                      marks: [{ type: 'italic' }],
                      text: 'styling',
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // Image Field
      {
        type: FormFieldType.IMAGE,
        id: 'image',
        props: [
          {
            type: PropertyType.IMAGE,
            label: 'Image',
            src: '/sample-image.jpg',
            alt: 'Sample Image',
            textAlign: TextAlign.CENTER,
            objectFit: ObjectFit.CONTAIN,
            width: {
              value: { value: 300, unit: 'px' },
              autoWidth: false,
            },
          },
        ],
      },

      // Button Field
      {
        type: FormFieldType.BUTTON,
        id: 'button',
        props: [
          {
            type: PropertyType.BUTTON,
            label: 'Button',
            btnType: ButtonType.BUTTON,
            fullWidth: true,
            color: '#007bff',
            bgColor: '#ffffff',
          },
        ],
      },

      // Page Field
      {
        type: FormFieldType.PAGE,
        id: 'page',
        props: [
          {
            type: PropertyType.PAGE,
            label: 'Page',
            name: 'Sample Page',
          },
        ],
        children: [
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'pageField1',
            props: [
              {
                type: PropertyType.TEXT,
                label: 'Page Field 1',
              },
            ],
          },
        ],
      },

      // Divider Field
      {
        type: FormFieldType.DIVIDER,
        id: 'divider',
        props: [
          {
            type: PropertyType.DIVIDER,
            label: 'Divider',
            color: '#cccccc',
            width: { value: 100, unit: '%' },
            height: { value: 1, unit: 'px' },
            style: DividerStyle.SOLID,
          },
        ],
      },

      // Account Type Selection
      {
        type: FormFieldType.SINGLE_CHOICE,
        id: 'accountType',
        props: [
          {
            type: PropertyType.TYPE,
            label: 'Account Type',
            isRequired: true,
            options: [
              { label: 'Personal', value: 'personal' },
              { label: 'Business', value: 'business' },
            ],
          },
        ],
      },

      // Personal Information Section
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'firstName',
        props: [
          {
            type: PropertyType.NAME,
            label: 'First Name',
            isRequired: true,
            validation: [
              {
                type: 'standard',
                operator: 'regex',
                value: /^[A-Za-z\s-]+$/,
                message: 'Only letters, spaces, and hyphens allowed',
              },
            ],
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'lastName',
        props: [
          {
            type: PropertyType.NAME,
            label: 'Last Name',
            isRequired: true,
            validation: [
              {
                type: 'standard',
                operator: 'regex',
                value: /^[A-Za-z\s-]+$/,
                message: 'Only letters, spaces, and hyphens allowed',
              },
            ],
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'email',
        props: [
          {
            type: PropertyType.EMAIL,
            label: 'Email Address',
            isRequired: true,
            validation: [
              {
                type: 'standard',
                operator: 'regex',
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            ],
          },
        ],
      },

      // Business Information Section (conditionally shown)
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'businessName',
        props: [
          {
            type: PropertyType.NAME,
            label: 'Business Name',
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'taxId',
        props: [
          {
            type: PropertyType.TAX,
            label: 'Tax ID',
            isRequired: true,
            validation: [
              {
                type: 'standard',
                operator: 'regex',
                value: /^[0-9]{9}$/,
                message: 'Please enter a valid 9-digit tax ID',
              },
            ],
          },
        ],
      },

      // Address Section
      {
        type: FormFieldType.LONG_TEXT,
        id: 'address',
        props: [
          {
            type: PropertyType.ADDRESS,
            label: 'Address',
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'city',
        props: [
          {
            type: PropertyType.CITY,
            label: 'City',
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'state',
        props: [
          {
            type: PropertyType.STATE,
            label: 'State',
            isRequired: true,
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'zipCode',
        props: [
          {
            type: PropertyType.ZIP,
            label: 'ZIP Code',
            isRequired: true,
            validation: [
              {
                type: 'standard',
                operator: 'regex',
                value: /^[0-9]{5}(-[0-9]{4})?$/,
                message: 'Please enter a valid ZIP code',
              },
            ],
          },
        ],
      },

      // Terms and Conditions
      {
        type: FormFieldType.PARAGRAPH,
        id: 'terms',
        props: [
          {
            type: PropertyType.CONTENT,
            label: 'Terms and Conditions',
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'By submitting this form, you agree to our ',
                    },
                    {
                      type: 'text',
                      marks: [{ type: 'link', attrs: { href: '/terms' } }],
                      text: 'Terms of Service',
                    },
                    { type: 'text', text: ' and ' },
                    {
                      type: 'text',
                      marks: [{ type: 'link', attrs: { href: '/privacy' } }],
                      text: 'Privacy Policy',
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // Submit Button
      {
        type: FormFieldType.BUTTON,
        id: 'submit',
        props: [
          {
            type: PropertyType.BUTTON,
            label: 'Submit',
            btnType: ButtonType.SUBMIT,
            fullWidth: true,
          },
        ],
      },
    ],
    rules: [
      // Show/hide business fields based on account type
      {
        type: RuleType.GROUP,
        conditions: {
          fieldId: 'accountType',
          operator: 'equals',
          value: 'business',
        },
        action: {
          type: ActionType.SHOW,
          fields: ['businessName', 'taxId'],
        },
      },
      {
        type: RuleType.GROUP,
        conditions: {
          fieldId: 'accountType',
          operator: 'equals',
          value: 'personal',
        },
        action: {
          type: ActionType.HIDE,
          fields: ['businessName', 'taxId'],
        },
      },

      // Cross-field validation for business accounts
      {
        type: RuleType.VALIDATION,
        conditions: {
          fieldId: 'accountType',
          operator: 'equals',
          value: 'business',
        },
        action: {
          type: 'crossField',
          fields: ['businessName', 'taxId'],
          rules: [
            {
              type: 'standard',
              operator: 'notEquals',
              value: '',
              message:
                'Business name and tax ID are required for business accounts',
            },
          ],
          preventSubmission: true,
        },
      },

      // Error handling for API errors
      {
        type: RuleType.ERROR,
        conditions: {
          fieldId: 'submit',
          operator: 'isInvalid',
          value: true,
        },
        action: {
          type: ActionType.DISPLAY,
          fields: ['submit'],
          display: {
            position: DisplayPosition.TOAST,
            style: {
              color: '#ff0000',
              backgroundColor: '#fff0f0',
            },
          },
        },
      },
    ],
  },
};
