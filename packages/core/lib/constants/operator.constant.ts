export const SharedOperator = {
  IS_FILLED: 'is_filled',
  IS_EMPTY: 'is_empty',
  IS_VALID: 'is_valid',
  IS_INVALID: 'is_invalid',
} as const;

export const StringOperator = {
  EQUAL: 'equal',
  NOT_EQUAL: 'not_equal',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'not_contains',
  STARTS_WITH: 'starts_with',
  NOT_STARTS_WITH: 'not_starts_with',
  ENDS_WITH: 'ends_with',
  NOT_ENDS_WITH: 'not_ends_with',
} as const;

export const DateTimeOperator = {
  BEFORE: 'before',
  AFTER: 'after',
  ON_OR_BEFORE: 'on_or_before',
  ON_OR_AFTER: 'on_or_after',
  BETWEEN: 'between',
} as const;

export const NumberOperator = {
  EQUAL: 'equal',
  NOT_EQUAL: 'not_equal',
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
  GREATER_THAN_OR_EQUAL: 'greater_than_or_equal',
  LESS_THAN_OR_EQUAL: 'less_than_or_equal',
} as const;

export const BooleanOperator = {
  EQUAL: 'equal',
  NOT_EQUAL: 'not_equal',
  IS_TRUE: 'is_true',
  IS_FALSE: 'is_false',
} as const;

export const OptionsOperator = {
  IN: 'in',
  NOT_IN: 'not_in',
} as const;

export const PhoneOperator = {
  PHONE_COUNTRY_IN: 'phone_country_in',
  PHONE_COUNTRY_NOT_IN: 'phone_country_not_in',
} as const;

export const EmailOperator = {
  EMAIL_DOMAIN_IN: 'email_domain_in',
  EMAIL_DOMAIN_NOT_IN: 'email_domain_not_in',
} as const;

export const AddressOperator = {
  ADDRESS_COUNTRY_IN: 'address_country_in',
  ADDRESS_COUNTRY_NOT_IN: 'address_country_not_in',
  ADDRESS_CITY_IN: 'address_city_in',
  ADDRESS_CITY_NOT_IN: 'address_city_not_in',
  ADDRESS_STATE_IN: 'address_state_in',
  ADDRESS_STATE_NOT_IN: 'address_state_not_in',
  ADDRESS_POSTAL_CODE_IN: 'address_postal_code_in',
  ADDRESS_POSTAL_CODE_NOT_IN: 'address_postal_code_not_in',
} as const;

export const Operator = {
  ...SharedOperator,
  ...StringOperator,
  ...DateTimeOperator,
  ...NumberOperator,
  ...BooleanOperator,
  ...OptionsOperator,
  ...PhoneOperator,
  ...EmailOperator,
  ...AddressOperator,
} as const;

export type Operator = (typeof Operator)[keyof typeof Operator];
