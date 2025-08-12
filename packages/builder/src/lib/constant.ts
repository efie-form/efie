import {
  AddressOperator,
  BooleanOperator,
  DateTimeOperator,
  EmailOperator,
  FieldInputType,
  FieldType,
  NumberOperator,
  Operator,
  OptionsOperator,
  PhoneOperator,
  StringOperator,
} from '@efie-form/core';

export const FIELDS_NAME = {
  [FieldType.SHORT_TEXT]: 'Short Text',
  [FieldType.SINGLE_CHOICE]: 'Single Choice',
  [FieldType.NUMBER]: 'Number',
  [FieldType.ROW]: 'Row',
  [FieldType.MULTIPLE_CHOICES]: 'Multiple Choices',
  [FieldType.IMAGE]: 'Image',
  [FieldType.HEADING]: 'Heading',
  [FieldType.FILE]: 'File Upload',
  [FieldType.DIVIDER]: 'Divider',
  [FieldType.BLOCK]: 'Block',
  [FieldType.COLUMN]: 'Column',
  [FieldType.LONG_TEXT]: 'Long Text',
  [FieldType.DATE]: 'Date',
  [FieldType.TIME]: 'Time',
  [FieldType.DATE_TIME]: 'Date & Time',
  [FieldType.BUTTON]: 'Button',
  [FieldType.PAGE]: 'Page',
  [FieldType.ADDRESS]: 'Address',
  [FieldType.CHECKBOX]: 'Checkbox',
  [FieldType.EMAIL]: 'Email',
  [FieldType.PHONE]: 'Phone',
  [FieldType.PASSWORD]: 'Password',
  [FieldType.GROUP]: 'Group',
} satisfies Record<FieldType, string>;

export const textAlignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
} as const;

export const DEFAULT_IMAGE_URL =
  'https://via.assets.so/img.jpg?w=720&h=120&t=Image+Placeholder&tc=#555555&bg=#aaaaaa';

export const RIGHT_BAR_TABS = {
  PAGE: 'page',
  FORM: 'form',
  FIELD_SETTINGS: 'field-settings',
} as const;

export type RightBarTab = (typeof RIGHT_BAR_TABS)[keyof typeof RIGHT_BAR_TABS];

export const OPERATORS_NAME = {
  [Operator.ADDRESS_CITY_IN]: 'City is in',
  [Operator.ADDRESS_COUNTRY_IN]: 'Country is in',
  [Operator.ADDRESS_STATE_IN]: 'State is in',
  [Operator.ADDRESS_CITY_NOT_IN]: 'City is not in',
  [Operator.ADDRESS_COUNTRY_NOT_IN]: 'Country is not in',
  [Operator.ADDRESS_STATE_NOT_IN]: 'State is not in',
  [Operator.ADDRESS_POSTAL_CODE_IN]: 'Postal Code is in',
  [Operator.ADDRESS_POSTAL_CODE_NOT_IN]: 'Postal Code is not in',
  [Operator.CONTAINS]: 'Contains',
  [Operator.NOT_CONTAINS]: 'Does Not Contain',
  [Operator.STARTS_WITH]: 'Starts With',
  [Operator.ENDS_WITH]: 'Ends With',
  [Operator.IS_EMPTY]: 'Is Empty',
  [Operator.IS_FILLED]: 'Is Filled',
  [Operator.IS_INVALID]: 'Is Invalid',
  [Operator.IS_VALID]: 'Is Valid',
  [Operator.NOT_ENDS_WITH]: 'Does Not End With',
  [Operator.NOT_STARTS_WITH]: 'Does Not Start With',
  [Operator.AFTER]: 'Date is After',
  [Operator.BEFORE]: 'Date is Before',
  [Operator.BETWEEN]: 'Date is Between',
  [Operator.ON_OR_AFTER]: 'Date is On or After',
  [Operator.ON_OR_BEFORE]: 'Date is On or Before',
  [Operator.EMAIL_DOMAIN_IN]: 'Domain name is In',
  [Operator.EMAIL_DOMAIN_NOT_IN]: 'Domain name is Not In',
  [Operator.EQUAL]: 'Equals',
  [Operator.NOT_EQUAL]: 'Does Not Equal',
  [Operator.GREATER_THAN]: 'Greater Than',
  [Operator.GREATER_THAN_OR_EQUAL]: 'Greater Than or Equal',
  [Operator.LESS_THAN]: 'Less Than',
  [Operator.LESS_THAN_OR_EQUAL]: 'Less Than or Equal',
  [Operator.IS_TRUE]: 'Is True',
  [Operator.IS_FALSE]: 'Is False',
  [Operator.IN]: 'Is In',
  [Operator.NOT_IN]: 'Is Not In',
  [Operator.PHONE_COUNTRY_IN]: 'Phone Country is In',
  [Operator.PHONE_COUNTRY_NOT_IN]: 'Phone Country is Not In',
} satisfies Record<Operator, string>;

export const FieldTypeOperators: Record<FieldInputType, Operator[]> = {
  [FieldInputType.SHORT_TEXT]: Object.values(StringOperator),
  [FieldInputType.LONG_TEXT]: Object.values(StringOperator),
  [FieldInputType.NUMBER]: Object.values(NumberOperator),
  [FieldInputType.DATE]: Object.values(DateTimeOperator),
  [FieldInputType.TIME]: Object.values(DateTimeOperator),
  [FieldInputType.DATE_TIME]: Object.values(DateTimeOperator),
  [FieldInputType.EMAIL]: Object.values(EmailOperator),
  [FieldInputType.PHONE]: Object.values(PhoneOperator),
  [FieldInputType.ADDRESS]: Object.values(AddressOperator),
  [FieldInputType.FILE]: [],
  [FieldInputType.SINGLE_CHOICE]: Object.values(OptionsOperator),
  [FieldInputType.MULTIPLE_CHOICES]: Object.values(OptionsOperator),
  [FieldInputType.CHECKBOX]: Object.values(BooleanOperator),
  [FieldInputType.PASSWORD]: [],
};
