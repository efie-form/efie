import type { ActionType, RuleType } from '../constants/form-schema.constant';

// Field condition types
export interface FieldCondition {
  fieldId: string;
  operator: string;
  value: FieldConditionValue;
}

export interface FieldConditionGroup {
  operator: 'and' | 'or';
  conditions: (FieldCondition | FieldConditionGroup)[];
}

export type FieldConditionValue = FieldValue | RegExp;

// Field rule types
export interface FieldVisibilityRule {
  type: typeof RuleType.VISIBILITY;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.SHOW | typeof ActionType.HIDE;
    fields: string[];
  };
}

// Field condition operators
export type FieldConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'regex'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'isValid'
  | 'isInvalid'
  | 'custom';

// Field value types
export type FieldValue = string | number | boolean | null | undefined;

// Validation types
export type ValidationOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'regex';

// Base validation rule interface
export interface BaseValidationRule {
  type: string;
  message: string;
}

// Standard validation rule
export interface StandardValidationRule extends BaseValidationRule {
  type: 'standard';
  operator: ValidationOperator;
  value: FieldConditionValue;
}

// Future extensibility: Add new validation rule types here
export type ValidationRule = StandardValidationRule;

export interface ValidationGroup {
  type: 'group';
  operator: 'and' | 'or';
  rules: (ValidationRule | ValidationGroup)[];
}

export interface ValidationCondition {
  type: 'condition';
  fieldId: string;
  operator: ValidationOperator;
  value: FieldConditionValue;
  then: ValidationRule | ValidationGroup;
  else?: ValidationRule | ValidationGroup;
}

export interface ValidationCase {
  type: 'case';
  fieldId: string;
  cases: {
    value: FieldConditionValue;
    rules: ValidationRule | ValidationGroup;
  }[];
  default?: ValidationRule | ValidationGroup;
}

export type ValidationSchema =
  | ValidationRule
  | ValidationGroup
  | ValidationCondition
  | ValidationCase;
