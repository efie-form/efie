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
            type: PropertyType.LABEL,
            value: {
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
            type: PropertyType.LABEL,
            value: {
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
            type: PropertyType.LABEL,
            value: 'Short Text Input',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter short text',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },
      {
        type: FormFieldType.LONG_TEXT,
        id: 'longText',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Long Text Input',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter long text',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },
      {
        type: FormFieldType.NUMBER,
        id: 'number',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Number Input',
          },
          {
            type: PropertyType.PLACEHOLDER,
            value: 'Enter a number',
          },
          {
            type: PropertyType.MIN,
            value: 0,
            errorMessage: 'Value must be at least 0',
          },
          {
            type: PropertyType.MAX,
            value: 100,
            errorMessage: 'Value must be at most 100',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },

      // Choice Fields
      {
        type: FormFieldType.SINGLE_CHOICE,
        id: 'singleChoice',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Single Choice',
          },
          {
            type: PropertyType.OPTIONS,
            value: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ],
            errorMessage: 'Please select a valid option',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },
      {
        type: FormFieldType.MULTIPLE_CHOICES,
        id: 'multipleChoices',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Multiple Choices',
          },
          {
            type: PropertyType.OPTIONS,
            value: [
              { label: 'Choice 1', value: '1' },
              { label: 'Choice 2', value: '2' },
              { label: 'Choice 3', value: '3' },
            ],
            errorMessage: 'Please select at least one option',
          },
          {
            type: PropertyType.MULTIPLE,
            value: true,
            errorMessage: 'Please select at least one option',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },

      // Date/Time Fields
      {
        type: FormFieldType.DATE,
        id: 'date',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Date',
          },
          {
            type: PropertyType.FORMAT,
            value: 'YYYY-MM-DD',
            errorMessage: 'Please enter a valid date in YYYY-MM-DD format',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },
      {
        type: FormFieldType.TIME,
        id: 'time',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Time',
          },
          {
            type: PropertyType.FORMAT,
            value: 'HH:mm',
            errorMessage: 'Please enter a valid time in HH:mm format',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },
      {
        type: FormFieldType.DATE_TIME,
        id: 'dateTime',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Date and Time',
          },
          {
            type: PropertyType.FORMAT,
            value: 'YYYY-MM-DD HH:mm',
            errorMessage:
              'Please enter a valid date and time in YYYY-MM-DD HH:mm format',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },

      // File Field
      {
        type: FormFieldType.FILE,
        id: 'file',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'File Upload',
          },
          {
            type: PropertyType.ACCEPT,
            value: '.pdf,.doc,.docx',
            errorMessage: 'Only PDF and Word documents are allowed',
          },
          {
            type: PropertyType.MULTIPLE,
            value: true,
            errorMessage: 'Please select at least one file',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },

      // Layout Fields
      {
        type: FormFieldType.ROW,
        id: 'row',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Row Layout',
          },
          {
            type: PropertyType.GAP,
            value: { value: 16, unit: 'px' },
          },
        ],
        children: [
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'rowField1',
            props: [
              {
                type: PropertyType.LABEL,
                value: 'Row Field 1',
              },
            ],
          },
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'rowField2',
            props: [
              {
                type: PropertyType.LABEL,
                value: 'Row Field 2',
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
            type: PropertyType.LABEL,
            value: 'Column Layout',
          },
          {
            type: PropertyType.GAP,
            value: { value: 16, unit: 'px' },
          },
        ],
        children: [
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'columnField1',
            props: [
              {
                type: PropertyType.LABEL,
                value: 'Column Field 1',
              },
            ],
          },
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'columnField2',
            props: [
              {
                type: PropertyType.LABEL,
                value: 'Column Field 2',
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
            type: PropertyType.LABEL,
            value: 'Block Layout',
          },
          {
            type: PropertyType.GAP,
            value: { value: 16, unit: 'px' },
          },
        ],
        children: [
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'blockField1',
            props: [
              {
                type: PropertyType.LABEL,
                value: 'Block Field 1',
              },
            ],
          },
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'blockField2',
            props: [
              {
                type: PropertyType.LABEL,
                value: 'Block Field 2',
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
            type: PropertyType.LABEL,
            value: {
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
          {
            type: PropertyType.TEXT_ALIGN,
            value: TextAlign.LEFT,
          },
        ],
      },

      // Image Field
      {
        type: FormFieldType.IMAGE,
        id: 'image',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Image',
          },
          {
            type: PropertyType.SRC,
            value: '/sample-image.jpg',
            errorMessage: 'Invalid image URL',
          },
          {
            type: PropertyType.ALT,
            value: 'Sample Image',
            errorMessage: 'Please provide an alt text for accessibility',
          },
          {
            type: PropertyType.TEXT_ALIGN,
            value: TextAlign.CENTER,
          },
          {
            type: PropertyType.OBJECT_FIT,
            value: ObjectFit.CONTAIN,
          },
          {
            type: PropertyType.WIDTH,
            value: { value: 300, unit: 'px' },
          },
        ],
      },

      // Button Field
      {
        type: FormFieldType.BUTTON,
        id: 'button',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Button',
          },
          {
            type: PropertyType.BTN_TYPE,
            value: ButtonType.BUTTON,
          },
          {
            type: PropertyType.FULL_WIDTH,
            value: true,
          },
          {
            type: PropertyType.COLOR,
            value: '#007bff',
          },
          {
            type: PropertyType.BG_COLOR,
            value: '#ffffff',
          },
          {
            type: PropertyType.ALIGN,
            value: TextAlign.CENTER,
          },
        ],
      },

      // Page Field
      {
        type: FormFieldType.PAGE,
        id: 'page',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Page',
          },
          {
            type: PropertyType.WIDTH,
            value: { value: 100, unit: '%' },
          },
        ],
        children: [
          {
            type: FormFieldType.SHORT_TEXT,
            id: 'pageField1',
            props: [
              {
                type: PropertyType.LABEL,
                value: 'Page Field 1',
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
            type: PropertyType.LABEL,
            value: 'Divider',
          },
          {
            type: PropertyType.COLOR,
            value: '#cccccc',
          },
          {
            type: PropertyType.WIDTH,
            value: { value: 100, unit: '%' },
          },
          {
            type: PropertyType.HEIGHT,
            value: { value: 1, unit: 'px' },
          },
          {
            type: PropertyType.STYLE,
            value: DividerStyle.SOLID,
          },
        ],
      },

      // Account Type Selection
      {
        type: FormFieldType.SINGLE_CHOICE,
        id: 'accountType',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Account Type',
          },
          {
            type: PropertyType.OPTIONS,
            value: [
              { label: 'Personal', value: 'personal' },
              { label: 'Business', value: 'business' },
            ],
            errorMessage: 'Please select an account type',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'This field is required',
          },
        ],
      },

      // Personal Information Section
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'firstName',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'First Name',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'First name is required',
          },
        ],
        form: {
          key: 'firstName',
          validation: [
            {
              type: 'standard',
              operator: 'regex',
              value: /^[A-Za-z\s-]+$/,
              message: 'Only letters, spaces, and hyphens allowed',
            },
          ],
        },
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'lastName',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Last Name',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'Last name is required',
          },
        ],
        form: {
          key: 'lastName',
          validation: [
            {
              type: 'standard',
              operator: 'regex',
              value: /^[A-Za-z\s-]+$/,
              message: 'Only letters, spaces, and hyphens allowed',
            },
          ],
        },
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'email',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Email Address',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'Email is required',
          },
        ],
        form: {
          key: 'email',
          validation: [
            {
              type: 'standard',
              operator: 'regex',
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          ],
        },
      },

      // Business Information Section (conditionally shown)
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'businessName',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Business Name',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'Business name is required',
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'taxId',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Tax ID',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'Tax ID is required',
          },
        ],
        form: {
          key: 'taxId',
          validation: [
            {
              type: 'standard',
              operator: 'regex',
              value: /^[0-9]{9}$/,
              message: 'Please enter a valid 9-digit tax ID',
            },
          ],
        },
      },

      // Address Section
      {
        type: FormFieldType.LONG_TEXT,
        id: 'address',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'Address',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'Address is required',
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'city',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'City',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'City is required',
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'state',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'State',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'State is required',
          },
        ],
      },
      {
        type: FormFieldType.SHORT_TEXT,
        id: 'zipCode',
        props: [
          {
            type: PropertyType.LABEL,
            value: 'ZIP Code',
          },
          {
            type: PropertyType.REQUIRED,
            value: true,
            errorMessage: 'ZIP code is required',
          },
        ],
        form: {
          key: 'zipCode',
          validation: [
            {
              type: 'standard',
              operator: 'regex',
              value: /^[0-9]{5}(-[0-9]{4})?$/,
              message: 'Please enter a valid ZIP code',
            },
          ],
        },
      },

      // Terms and Conditions
      {
        type: FormFieldType.PARAGRAPH,
        id: 'terms',
        props: [
          {
            type: PropertyType.LABEL,
            value: {
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
            type: PropertyType.LABEL,
            value: 'Submit',
          },
          {
            type: PropertyType.BTN_TYPE,
            value: ButtonType.SUBMIT,
          },
          {
            type: PropertyType.FULL_WIDTH,
            value: true,
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
