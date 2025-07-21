import { CustomPropertyType, FieldType, PropertyType, type FieldsConfigsMap } from '@efie-form/core';

const settingsConfig: FieldsConfigsMap = {
  [FieldType.SHORT_TEXT]: {
    properties: [
      { type: PropertyType.LABEL, label: 'Label' },
      { type: PropertyType.PLACEHOLDER, label: 'Input Placeholder' },
      { type: PropertyType.REQUIRED, label: 'Required' },
      { type: PropertyType.CUSTOM, label: 'Hide Label?', dataType: CustomPropertyType.BOOLEAN, id: 'hideLabel' },
      { type: PropertyType.CUSTOM, label: 'Hide Placeholder?', dataType: CustomPropertyType.TEXT, id: 'hidePlaceholder' },
      { type: PropertyType.CUSTOM, label: 'Input Color', dataType: CustomPropertyType.COLOR, id: 'inputName' },
      { type: PropertyType.CUSTOM, label: 'Input Number', dataType: CustomPropertyType.NUMBER, id: 'inputNumber' },
      { type: PropertyType.CUSTOM, label: 'Input Select', dataType: CustomPropertyType.SELECT, id: 'inputSelect', options: ['Option 1', 'Option 2', 'Option 3'] },
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
