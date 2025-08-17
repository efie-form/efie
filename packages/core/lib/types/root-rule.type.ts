import type { Operator } from '../constants/operator.constant';
import type { RuleAction } from '../constants/rule-action.constant';
import type { ValueSpec } from './value-spec.type';

// JSON-safe scalar and composite value
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

// Rule document model
export interface Rule {
  id: string;
  enabled?: boolean;
  triggers?: ('onChange' | 'onPageEnter' | 'onSubmit')[];
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
  | { kind: 'constant'; value: JsonPrimitive }
  | { kind: 'now' }
  | { kind: 'today' }
  | { kind: 'env'; name: string };

// Actions (discriminated)
export type Action =
  | ShowFieldsAction
  | HideFieldsAction
  | SetRequiredAction
  | SetOptionalAction
  | CustomAction;

export interface ShowFieldsAction {
  id: string;
  type: typeof RuleAction.SHOW_FIELDS;
  fields: string[];
}
export interface HideFieldsAction {
  id: string;
  type: typeof RuleAction.HIDE_FIELDS;
  fields: string[];
}
export interface SetRequiredAction {
  id: string;
  type: typeof RuleAction.SET_REQUIRED;
  fields: string[];
  value: boolean;
}
export interface SetOptionalAction {
  id: string;
  type: typeof RuleAction.SET_OPTIONAL;
  fields: string[];
  value: boolean;
}

export interface CustomAction {
  id: string;
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
