import type { Operator } from '../constants/operator.constant';
import type { ValueSpec } from './value-spec.type';

// JSON-safe scalar and composite value
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

// Rule document model
export interface Rule {
  id: string;
  enabled?: boolean;
  triggers?: ('onChange' | 'onPageEnter' | 'onSubmit')[];
  // Single branch (previously an array of branches with optional else actions)
  branch: RuleBranch;
}

export interface RuleBranch {
  when: ConditionTree;
  actions: Action[];
}

export interface ConditionTree {
  logic: 'all' | 'any';
  children: Array<ConditionTree | ConditionNode>;
}

export interface ConditionNode {
  left: Operand;
  operator: Operator;
  right?: Operand | Operand[];
  options?: ConditionOptions;
}

export interface ConditionOptions {
  inclusive?: boolean; // for between/date_between, gte/lte semantics
  caseSensitive?: boolean; // for string ops
  locale?: string; // string collation
  timeZone?: string; // date ops
  flags?: string; // regex flags for matches
}

// Operands
export type Operand =
  | { kind: 'fieldValue'; field: string }
  | {
      kind: 'fieldState';
      field: string;
      state: 'touched' | 'dirty' | 'valid' | 'visible' | 'enabled' | 'required';
    }
  | { kind: 'fieldLength'; field: string }
  | { kind: 'constant'; value: JsonValue }
  | { kind: 'now' }
  | { kind: 'today' }
  | { kind: 'env'; name: string };

// Actions (discriminated)
export type Action =
  | ShowFieldsAction
  | HideFieldsAction
  | ShowPagesAction
  | HidePagesAction
  | ReorderFieldsAction
  | ReorderPagesAction
  | SkipToPageAction
  | SetRequiredAction
  | SetEnabledAction
  | SetVisibleAction
  | SetValueAction
  | ClearValueAction
  | CopyValueAction
  | SetOptionsAction
  | DisplayMessageAction
  | AddFieldErrorAction
  | ClearFieldErrorAction
  | HandleErrorAction
  | RecoverAction
  | FocusFieldAction
  | ScrollIntoViewAction
  | CustomAction;

export interface ShowFieldsAction {
  type: 'show_fields';
  fields: string[];
}
export interface HideFieldsAction {
  type: 'hide_fields';
  fields: string[];
}
export interface ShowPagesAction {
  type: 'show_pages';
  pages: string[];
}
export interface HidePagesAction {
  type: 'hide_pages';
  pages: string[];
}
export interface ReorderFieldsAction {
  type: 'reorder_fields';
  fields: string[];
  order: string[];
}
export interface ReorderPagesAction {
  type: 'reorder_pages';
  pages: string[];
  order: string[];
}
export interface SkipToPageAction {
  type: 'skip_to_page';
  to: string;
}
export interface SetRequiredAction {
  type: 'set_required';
  fields: string[];
  required: boolean;
}
export interface SetEnabledAction {
  type: 'set_enabled';
  fields: string[];
  enabled: boolean;
}
export interface SetVisibleAction {
  type: 'set_visible';
  fields: string[];
  visible: boolean;
}
export interface SetValueAction {
  type: 'set_value';
  field: string;
  value: JsonValue;
}
export interface ClearValueAction {
  type: 'clear_value';
  field: string;
}
export interface CopyValueAction {
  type: 'copy_value';
  from: string;
  to: string;
}
export interface SetOptionsAction {
  type: 'set_options';
  field: string;
  options: Array<{ id: string; label: string; value: JsonValue }>;
}
export interface DisplayMessageAction {
  type: 'display_message';
  target: 'inline' | 'toast' | 'modal' | 'banner';
  level: 'info' | 'warning' | 'error';
  text?: string;
  messageKey?: string;
  params?: Record<string, JsonValue>;
}
export interface AddFieldErrorAction {
  type: 'add_field_error';
  field: string;
  code: string;
  params?: Record<string, JsonValue>;
  severity?: 'error' | 'warning' | 'info';
  blocking?: boolean;
  messageKey?: string;
}
export interface ClearFieldErrorAction {
  type: 'clear_field_error';
  field: string;
  code?: string; // if omitted, clear all codes for this field
}
export interface HandleErrorAction {
  type: 'handle_error';
  fields: string[];
  handler: 'retry' | 'fallback' | 'redirect';
  maxRetries?: number;
  fallbackValue?: JsonValue;
  redirectUrl?: string;
}
export interface RecoverAction {
  type: 'recover';
  fields: string[];
  mode: 'auto' | 'manual';
  actionId?: string; // runtime maps this id to an action handler
  message?: string;
}
export interface FocusFieldAction {
  type: 'focus_field';
  field: string;
}
export interface ScrollIntoViewAction {
  type: 'scroll_into_view';
  target: 'field' | 'page';
  id: string;
}
export interface CustomAction {
  type: 'custom';
  name: string;
  input?: JsonValue;
}

// Custom action definition (form-level registry)
export interface CustomActionDefinition {
  name: string; // unique within form
  title?: string;
  description?: string;
  inputSpec: ValueSpec;
}

// Structured errors (for engine output types; included here for reference)
export interface ErrorItem {
  code: string; // e.g., 'required', 'min', 'date_before', 'custom:policy'
  params?: Record<string, JsonValue>;
  severity?: 'error' | 'warning' | 'info';
  blocking?: boolean;
  scope: 'field' | 'form' | 'page' | 'group';
  path: string[]; // e.g., ['field:age']
  source: 'builtin' | 'rule' | 'validation';
  ruleId?: string;
  messageKey?: string; // for i18n
}
