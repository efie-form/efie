export const PropertyType = {
  LABEL: 'label',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ACCEPT: 'accept',
  INPUT_NAME: 'input_name',
  OPTIONS: 'options',
  IMAGE_SRC: 'image_src',
  COLUMN_WIDTH: 'column_width',
  HEADING_CONTENT: 'heading_content',
  BUTTON_ACTION: 'button_action',
  PAGE_NAME: 'page_name',
  CUSTOM: 'custom',
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export const CustomPropertyType = {
  TEXT: 'text',
  NUMBER: 'number',
  COLOR: 'color',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  SIZE: 'size',
} as const;

export type CustomPropertyType = (typeof CustomPropertyType)[keyof typeof CustomPropertyType];
