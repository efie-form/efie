import type { FieldCondition, FieldConditionGroup, FieldValue, ValidationRule } from './field-conditions.type';

// Root page rule
export interface RootPageRule {
  type: 'page';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'show' | 'hide' | 'reorder' | 'skip';
    pages: string[];
    order?: string[];
    skipToPage?: string;
  };
}

// Root validation rule
export interface RootValidationRule {
  type: 'validation';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'crossField';
    fields: string[];
    rules: ValidationRule[];
    preventSubmission?: boolean;
  };
}

// Root error rule
export interface RootErrorRule {
  type: 'error';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'display' | 'handle' | 'recover';
    fields: string[];
    display?: {
      position: 'inline' | 'toast' | 'modal' | 'banner';
      style?: {
        color?: string;
        backgroundColor?: string;
        position?: 'top' | 'bottom' | 'left' | 'right';
      };
    };
    handler?: {
      type: 'retry' | 'fallback' | 'redirect';
      maxRetries?: number;
      fallbackValue?: FieldValue;
      redirectUrl?: string;
    };
    recovery?: {
      type: 'auto' | 'manual';
      action?: () => void;
      message?: string;
    };
  };
}

// Root group rule
export interface RootGroupRule {
  type: 'group';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'show' | 'hide' | 'reorder';
    fields: string[];
    order?: string[];
  };
}

// Union type of all root rules
export type RootRule =
  | RootGroupRule
  | RootPageRule
  | RootValidationRule
  | RootErrorRule;
