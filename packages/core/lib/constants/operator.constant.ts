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

export const DateOperator = {
  BEFORE: 'date_before',
  AFTER: 'date_after',
  ON_OR_BEFORE: 'date_on_or_before',
  ON_OR_AFTER: 'date_on_or_after',
  BETWEEN: 'date_between',
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
  EQUAL: 'equal',
  NOT_EQUAL: 'not_equal',
  IN: 'in',
  NOT_IN: 'not_in',
} as const;
