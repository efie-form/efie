export const RuleAction = {
  SET_OPTIONAL: 'set_optional',
  SET_REQUIRED: 'set_required',
  SHOW_FIELDS: 'show_fields',
  HIDE_FIELDS: 'hide_fields',
} as const;

export type RuleAction = (typeof RuleAction)[keyof typeof RuleAction];
