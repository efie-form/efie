import type { Action, ConditionNode, ConditionTree, Operand } from '@efie-form/core';
import { RuleAction } from '@efie-form/core';

export interface BuildSummaryCtx {
  fieldLabelMap: Map<string, string>;
}

export interface ConditionLine {
  text: string;
  depth: number;
  kind: 'group' | 'condition';
  logic?: 'all' | 'any';
  segments?: TextSegment[];
}
export interface TextSegment {
  text: string;
  kind: 'field' | 'operator' | 'value' | 'plain';
}
export interface ActionLine {
  text: string;
  segments?: TextSegment[];
}

const OPERATOR_PHRASES: Record<string, string> = {
  equal: '=',
  not_equal: '!=',
  contains: 'contains',
  not_contains: 'not contains',
  starts_with: 'starts with',
  not_starts_with: 'not starts with',
  ends_with: 'ends with',
  not_ends_with: 'not ends with',
  greater_than: '>',
  greater_than_or_equal: '>=',
  less_than: '<',
  less_than_or_equal: '<=',
  is_filled: 'is filled',
  is_empty: 'is empty',
  is_valid: 'is valid',
  is_invalid: 'is invalid',
  in: 'in',
  not_in: 'not in',
  between: 'between',
  before: 'before',
  after: 'after',
  on_or_before: 'on or before',
  on_or_after: 'on or after',
  is_true: 'is true',
  is_false: 'is false',
  phone_country_in: 'phone country in',
  phone_country_not_in: 'phone country not in',
  email_domain_in: 'email domain in',
  email_domain_not_in: 'email domain not in',
};

const NO_VALUE_OPERATORS = new Set([
  'is_empty',
  'is_filled',
  'is_valid',
  'is_invalid',
  'is_true',
  'is_false',
]);

export function isGroup(node: ConditionTree | ConditionNode): node is ConditionTree {
  return (
    (node as ConditionTree).logic !== undefined && Array.isArray((node as ConditionTree).children)
  );
}

export function renderConditionNode(node: ConditionNode, ctx: BuildSummaryCtx): string {
  const left = node.left;
  const fieldName =
    left.kind === 'fieldValue'
      ? ctx.fieldLabelMap.get(left.field) || left.field || 'Field'
      : left.kind;
  const opRaw = node.operator as string;
  const opPhrase = OPERATOR_PHRASES[opRaw] || opRaw.replaceAll('_', ' ');
  if (NO_VALUE_OPERATORS.has(opRaw)) return `${fieldName} ${opPhrase}`;
  const val = extractRightValue(node.right, ctx);
  return `${fieldName} ${opPhrase} ${val}`.trim();
}

function extractRightValue(right: ConditionNode['right'], ctx: BuildSummaryCtx): string {
  if (!right) return '';
  const arr = Array.isArray(right) ? right : [right];
  const vals = arr.map((o) => operandToString(o as Operand, ctx)).filter(Boolean);
  if (!vals.length) return '';
  return vals.length > 1 ? `[${vals.join(', ')}]` : vals[0];
}

function operandToString(op: Operand, ctx: BuildSummaryCtx): string {
  switch (op.kind) {
    case 'constant':
      try {
        return typeof op.value === 'string' ? `'${truncate(op.value)}'` : JSON.stringify(op.value);
      } catch {
        return 'value';
      }
    case 'fieldValue':
      return ctx.fieldLabelMap.get(op.field) || op.field;
    case 'fieldState':
      return `${ctx.fieldLabelMap.get(op.field) || op.field} ${op.state}`;
    case 'fieldLength':
      return `${ctx.fieldLabelMap.get(op.field) || op.field} length`;
    case 'now':
      return 'now';
    case 'today':
      return 'today';
    case 'env':
      return `$${op.name}`;
    default:
      return 'value';
  }
}

function truncate(s: string, max = 24) {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

export function getActionLines(actions: Action[], ctx: BuildSummaryCtx): ActionLine[] {
  if (!actions.length) return [{ text: 'No actions' }];
  const out: ActionLine[] = [];
  for (const a of actions) {
    switch (a.type) {
      case RuleAction.SHOW_FIELDS:
        out.push(fieldListLine('show', a.fields, ctx));
        break;
      case RuleAction.HIDE_FIELDS:
        out.push(fieldListLine('hide', a.fields, ctx));
        break;
      case RuleAction.SET_REQUIRED:
        out.push(fieldListLine('set required', a.fields, ctx));
        break;
      case RuleAction.SET_OPTIONAL:
        out.push(fieldListLine('set optional', a.fields, ctx));
        break;
      default: {
        const custom = a as Extract<Action, { type: 'custom' }>;
        if (custom.type === 'custom')
          out.push({ text: `custom action ${custom.name || ''}`.trim() });
      }
    }
  }
  return out;
}

function fieldListLine(prefix: string, ids: string[], ctx: BuildSummaryCtx): ActionLine {
  if (!ids.length)
    return {
      text: `${prefix} (no fields)`,
      segments: [
        { text: prefix, kind: 'plain' },
        { text: ' (no fields)', kind: 'value' },
      ],
    };
  const labels = ids.map((id) => ctx.fieldLabelMap.get(id) || id);
  const truncated = labels.length > 3 ? labels.slice(0, 3).concat('…') : labels;
  const text = `${prefix} ${truncated.join(', ')}`;
  const segments: TextSegment[] = [
    { text: prefix, kind: 'plain' },
    { text: ' ', kind: 'plain' },
  ];
  truncated.forEach((lab, i) => {
    const isEllipsis = lab === '…';
    segments.push({ text: lab, kind: isEllipsis ? 'plain' : 'field' });
    if (i < truncated.length - 1) segments.push({ text: ', ', kind: 'plain' });
  });
  return { text, segments };
}
