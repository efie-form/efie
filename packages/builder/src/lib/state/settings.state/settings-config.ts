import { FieldType, PropertyType, type FieldsConfigsMap } from '@efie-form/core';

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
  } };

export default settingsConfig;
