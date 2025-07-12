export const PropSettingsTemplate = {
  TEXT: 'text',
  BOOLEAN: 'boolean',
  FORM_KEY: 'formKey',
  OPTION: 'option',
  NUMBER: 'number',
  ACCEPT: 'accept',
  COLOR: 'color',
  IMAGE_URL: 'imageUrl',
  SIZE: 'size',
  BORDER_RADIUS: 'borderRadius',
  MARGIN: 'margin',
  PADDING: 'padding',
  BOX_SHADOW: 'boxShadow',
  SELECT: 'select',
  BUTTON_ACTION: 'buttonAction',
} as const;

export type PropSettingsTemplate = (typeof PropSettingsTemplate)[keyof typeof PropSettingsTemplate];
