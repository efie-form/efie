import type { Action, ConditionNode, ConditionTree, Operand, Rule } from '@efie-form/core';
import { RuleAction } from '@efie-form/core';

export interface BuildSummaryCtx {
  fieldLabelMap: Map<string, string>;
}

export function buildRuleSummary(rule: Rule, ctx: BuildSummaryCtx): string {
  const cond = rule.when ? renderCondition(rule.when as ConditionTree, ctx) : 'Always';
  const acts = rule.actions?.length ? renderActions(rule.actions, ctx) : 'No actions';
  let text = cond === 'Always' ? acts : `If ${cond} then ${acts}`;
  const MAX = 200;
  if (text.length > MAX) text = text.slice(0, MAX - 1).trimEnd() + '…';
  return text;
}

export function renderCondition(node: ConditionTree | ConditionNode, ctx: BuildSummaryCtx): string {
  if (isGroup(node)) {
    if (!node.children.length) return 'Always';
    const parts = node.children
      .map((c) => renderCondition(c as ConditionTree | ConditionNode, ctx))
      .filter((p) => p);
    const joiner = node.logic === 'all' ? ' AND ' : ' OR ';
    const joined = parts.join(joiner);
    return parts.length > 1 ? `(${joined})` : joined;
  }
  return renderConditionNode(node as ConditionNode, ctx);
}

function isGroup(node: ConditionTree | ConditionNode): node is ConditionTree {
  return (
    (node as ConditionTree).logic !== undefined && Array.isArray((node as ConditionTree).children)
  );
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

function renderConditionNode(node: ConditionNode, ctx: BuildSummaryCtx): string {
  const left = node.left;
  let fieldName = '';
  if (left.kind === 'fieldValue')
    fieldName = ctx.fieldLabelMap.get(left.field) || left.field || 'Field';
  else fieldName = left.kind;
  const opRaw = node.operator as string;
  const opPhrase = OPERATOR_PHRASES[opRaw] || opRaw.replaceAll('_', ' ');
  const needsValue = !NO_VALUE_OPERATORS.has(opRaw);
  if (!needsValue) return `${fieldName} ${opPhrase}`;
  const val = extractRightValue(node.right, ctx);
  return `${fieldName} ${opPhrase} ${val}`.trim();
}

function extractRightValue(right: ConditionNode['right'], ctx: BuildSummaryCtx): string {
  if (!right) return '';
  const asArray = Array.isArray(right) ? right : [right];
  const values = asArray.map((op) => operandToString(op as Operand, ctx)).filter(Boolean);
  if (!values.length) return '';
  return values.length > 1 ? `[${values.join(', ')}]` : values[0];
}

function operandToString(op: Operand, ctx: BuildSummaryCtx): string {
  if (op.kind === 'constant') {
    try {
      if (typeof op.value === 'string') return `'${truncate(op.value)}'`;
      return JSON.stringify(op.value);
    } catch {
      return 'value';
    }
  }
  if (op.kind === 'fieldValue') return ctx.fieldLabelMap.get(op.field) || op.field;
  if (op.kind === 'fieldState') return `${ctx.fieldLabelMap.get(op.field) || op.field} ${op.state}`;
  if (op.kind === 'fieldLength') return `${ctx.fieldLabelMap.get(op.field) || op.field} length`;
  if (op.kind === 'now') return 'now';
  if (op.kind === 'today') return 'today';
  if (op.kind === 'env') return `$${op.name}`;
  const _never: never = op;
  return String(_never);
}

function truncate(s: string, max = 24) {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function renderActions(actions: Action[], ctx: BuildSummaryCtx): string {
  if (!actions.length) return 'No actions';
  const parts: string[] = [];
  for (const a of actions) {
    switch (a.type) {
      case RuleAction.SHOW_FIELDS:
        parts.push(`show ${formatFieldList(a.fields, ctx)}`);
        break;
      case RuleAction.HIDE_FIELDS:
        parts.push(`hide ${formatFieldList(a.fields, ctx)}`);
        break;
      case RuleAction.SET_REQUIRED:
        parts.push(`set required ${formatFieldList(a.fields, ctx)}`);
        break;
      case RuleAction.SET_OPTIONAL:
        parts.push(`set optional ${formatFieldList(a.fields, ctx)}`);
        break;
      default: {
        const custom = a as Extract<Action, { type: 'custom' }>;
        if (custom.type === 'custom') parts.push(`custom action ${custom.name || ''}`.trim());
      }
    }
  }
  return parts.join('; ');
}

function formatFieldList(ids: string[], ctx: BuildSummaryCtx): string {
  if (!ids.length) return '(no fields)';
  const labels = ids.map((id) => ctx.fieldLabelMap.get(id) || id);
  const joined = labels.join(', ');
  return labels.length > 3 ? labels.slice(0, 3).join(', ') + '…' : joined;
}

export function buildMultilineSummary(
  rule: Rule,
  ctx: BuildSummaryCtx,
): { conditions: string[]; actions: string } {
  const cond: ConditionTree | ConditionNode = rule.when
    ? (rule.when as ConditionTree)
    : ({ logic: 'all', children: [] } as ConditionTree);
  const conditions: string[] = [];
  if (isGroup(cond)) {
    for (const child of cond.children) {
      conditions.push(renderCondition(child, ctx));
    }
  } else {
    conditions.push(renderCondition(cond, ctx));
  }
  return { conditions, actions: renderActions(rule.actions || [], ctx) };
}

// ---------- Structured representation (with nesting) -----------------------
export interface ConditionLine {
  text: string; // rendered text (group header or condition)
  depth: number; // nesting level starting at 0 for root group header (if included) / first conditions
  kind: 'group' | 'condition';
  logic?: 'all' | 'any'; // only for group
  // For kind === 'condition', a segmented breakdown for syntax highlighting
  segments?: TextSegment[];
}

export interface TextSegment {
  text: string;
  kind: 'field' | 'operator' | 'value' | 'plain';
}

export interface ActionLine {
  text: string; // full fallback plain text
  segments?: TextSegment[]; // segmented version for highlighting
}

export interface StructuredSummary {
  conditionLines: ConditionLine[];
  actionLines: ActionLine[]; // each action textual / segmented
}

export function buildStructuredSummary(rule: Rule, ctx: BuildSummaryCtx): StructuredSummary {
  const root: ConditionTree = rule.when
    ? (rule.when as ConditionTree)
    : ({ logic: 'all', children: [] } as ConditionTree);
  const lines: ConditionLine[] = [];

  const walk = (node: ConditionTree | ConditionNode, depth: number, isRoot: boolean) => {
    if (isGroup(node)) {
      // Add header except when root has no children (Always)
      if (!node.children.length) {
        lines.push({ text: 'Always', depth, kind: 'condition' });
        return;
      }
      if (!isRoot || isRoot) {
        // show group header even for root (clearer nesting)
        lines.push({
          text: node.logic === 'all' ? 'ALL of:' : 'ANY of:',
          depth,
          kind: 'group',
          logic: node.logic,
        });
      }
      for (const child of node.children) {
        walk(child as ConditionTree | ConditionNode, depth + 1, false);
      }
    } else {
      const conditionNode = node as ConditionNode;
      lines.push({
        text: renderConditionNode(conditionNode, ctx),
        depth,
        kind: 'condition',
        segments: buildConditionSegments(conditionNode, ctx),
      });
    }
  };

  walk(root, 0, true);

  const actionLines = getActionLines(rule.actions || [], ctx);
  return { conditionLines: lines, actionLines };
}
// ---------- Segmentation helpers for highlighting -------------------------

function buildConditionSegments(node: ConditionNode, ctx: BuildSummaryCtx): TextSegment[] {
  const segs: TextSegment[] = [];
  // LEFT operand
  const left = node.left;
  if (left.kind === 'fieldValue') {
    const label = ctx.fieldLabelMap.get(left.field) || left.field || 'Field';
    segs.push({ text: label, kind: 'field' });
  } else {
    segs.push({ text: left.kind, kind: 'plain' });
  }

  const opRaw = node.operator as string;
  const opPhrase = OPERATOR_PHRASES[opRaw] || opRaw.replaceAll('_', ' ');
  segs.push({ text: ` ${opPhrase}`, kind: 'operator' });

  if (!NO_VALUE_OPERATORS.has(opRaw)) {
    const rightText = extractRightValue(node.right, ctx);
    if (rightText) {
      // Attempt to split multiple values for highlighting field references
      if (Array.isArray(node.right)) {
        const parts: Operand[] = node.right as Operand[];
        parts.forEach((p, idx) => {
          const isField = p.kind === 'fieldValue';
          const txt = operandToString(p, ctx);
          if (idx === 0) segs.push({ text: ' ', kind: 'plain' });
          if (isField) segs.push({ text: txt, kind: 'field' });
          else segs.push({ text: txt, kind: 'value' });
          if (idx < parts.length - 1) segs.push({ text: ', ', kind: 'plain' });
        });
      } else {
        const singleOperand = node.right as Operand;
        const isField = singleOperand && singleOperand.kind === 'fieldValue';
        segs.push({ text: ' ', kind: 'plain' });
        segs.push({ text: rightText, kind: isField ? 'field' : 'value' });
      }
    }
  }
  return segs;
}

function getActionLines(actions: Action[], ctx: BuildSummaryCtx): ActionLine[] {
  if (!actions.length) return [{ text: 'No actions' }];
  const out: ActionLine[] = [];
  for (const a of actions) {
    switch (a.type) {
      case RuleAction.SHOW_FIELDS: {
        const { text, segments } = formatFieldListSegments('show', a.fields, ctx);
        out.push({ text, segments });
        break;
      }
      case RuleAction.HIDE_FIELDS: {
        const { text, segments } = formatFieldListSegments('hide', a.fields, ctx);
        out.push({ text, segments });
        break;
      }
      case RuleAction.SET_REQUIRED: {
        const { text, segments } = formatFieldListSegments('set required', a.fields, ctx);
        out.push({ text, segments });
        break;
      }
      case RuleAction.SET_OPTIONAL: {
        const { text, segments } = formatFieldListSegments('set optional', a.fields, ctx);
        out.push({ text, segments });
        break;
      }
      default: {
        const custom = a as Extract<Action, { type: 'custom' }>;
        if (custom.type === 'custom') {
          out.push({ text: `custom action ${custom.name || ''}`.trim() });
        }
      }
    }
  }
  return out;
}

function formatFieldListSegments(
  prefix: string,
  ids: string[],
  ctx: BuildSummaryCtx,
): { text: string; segments: TextSegment[] } {
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
  truncated.forEach((label, idx) => {
    const isEllipsis = label === '…';
    segments.push({ text: label, kind: isEllipsis ? 'plain' : 'field' });
    if (idx < truncated.length - 1) segments.push({ text: ', ', kind: 'plain' });
  });
  return { text, segments };
}
