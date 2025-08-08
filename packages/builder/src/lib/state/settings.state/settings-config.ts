import { type FieldsConfigsMap, FieldType, PropertyType } from '@efie-form/core';

const settingsConfig: FieldsConfigsMap = {
  [FieldType.SHORT_TEXT]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.PLACEHOLDER, label: 'Input Placeholder' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },

  [FieldType.LONG_TEXT]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.PLACEHOLDER, label: 'Input Placeholder' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.NUMBER]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.PLACEHOLDER, label: 'Input Placeholder' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.SINGLE_CHOICE]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.OPTIONS, label: 'Options' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.MULTIPLE_CHOICES]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.OPTIONS, label: 'Options' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.DATE]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.TIME]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.DATE_TIME]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.FILE]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.REQUIRED, label: 'Required' },
      { type: PropertyType.ACCEPT, label: 'Accepted File Types' },
    ],
  },
  [FieldType.DIVIDER]: {
    properties: [],
  },
  [FieldType.IMAGE]: {
    properties: [{ type: PropertyType.IMAGE_SRC, label: 'Image URL' }],
  },
  [FieldType.ROW]: {
    properties: [],
  },
  [FieldType.COLUMN]: {
    properties: [],
  },
  [FieldType.BLOCK]: {
    properties: [],
  },
  [FieldType.PAGE]: {
    properties: [],
  },
  [FieldType.BUTTON]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Button Label' },
      { type: PropertyType.BUTTON_ACTION, label: 'Button Action' },
    ],
  },
  [FieldType.HEADING]: {
    properties: [],
    formats: {
      blockquote: true,
      code: true,
      codeBlock: true,
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      link: true,
      superscript: true,
      align: true,
      subscript: true,
      list: {
        ordered: true,
        bullet: true,
      },
      heading: {
        options: [
          { level: 0, label: 'Paragraph' },
          { level: 1, label: 'Heading 1' },
          { level: 2, label: 'Heading 2' },
          { level: 3, label: 'Heading 3' },
          { level: 4, label: 'Heading 4' },
          { level: 5, label: 'Heading 5' },
          { level: 6, label: 'Heading 6' },
        ],
        default: 0,
      },
      fontSize: {
        options: [
          { label: 'Small', size: '0.875rem' },
          { label: 'Medium', size: '1rem' },
          { label: 'Large', size: '2rem' },
          { label: 'Extra Large', size: '3rem' },
        ],
        default: { label: 'Medium', size: '1rem' },
      },
    },
  },
  [FieldType.ADDRESS]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.REQUIRED, label: 'Required' },
      { type: PropertyType.ADDRESS_FIELD, label: 'Address Field' },
    ],
  },
  [FieldType.CHECKBOX]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.EMAIL]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.PLACEHOLDER, label: 'Input Placeholder' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.PHONE]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.PLACEHOLDER, label: 'Input Placeholder' },
      { type: PropertyType.REQUIRED, label: 'Required' },
    ],
  },
  [FieldType.PASSWORD]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.PLACEHOLDER, label: 'Input Placeholder' },
      { type: PropertyType.REQUIRED, label: 'Required' },
      { type: PropertyType.PASSWORD_POLICY, label: 'Password Policy' },
    ],
  },
};

export default settingsConfig;
