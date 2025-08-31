import type { ConditionNode, Operand } from '@efie-form/core';
import { useMemo } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import { cn } from '../../../../lib/utils';
import type { ConditionLine } from './rule-helpers';

export interface ConditionsListProps {
  lines: ConditionLine[];
}

export function ConditionsList({ lines }: ConditionsListProps) {
  const groupHeaderIndices = useMemo(
    () => lines.map((l, idx) => (l.kind === 'group' ? idx : -1)).filter((v) => v !== -1),
    [lines],
  );
  const hasGroups = groupHeaderIndices.length > 0;
  return (
    <>
      {lines.map((line, idx) => (
        <ConditionLineRow
          key={idx}
          line={line}
          groupOrder={line.kind === 'group' ? groupHeaderIndices.indexOf(idx) : undefined}
          hasAnyGroup={hasGroups}
        />
      ))}
    </>
  );
}

interface ConditionLineRowProps {
  line: ConditionLine;
  groupOrder?: number;
  hasAnyGroup: boolean;
}

function ConditionLineRow({ line, groupOrder, hasAnyGroup }: ConditionLineRowProps) {
  const isGrp = line.kind === 'group';
  const isAlways = line.text === 'Always' && !hasAnyGroup;
  const prefix = useMemo(() => {
    if (isGrp) {
      return (
        <span className="me-1 rounded-sm bg-neutral-200 px-1 py-0.5 text-neutral-700">
          {groupOrder === 0 ? 'IF' : 'ELSE IF'}
        </span>
      );
    }
    if (isAlways) {
      return (
        <span className="me-1 rounded-sm bg-neutral-200 px-1 py-0.5 text-neutral-700">IF</span>
      );
    }
    return (
      <span className="me-1 inline-flex items-center text-neutral-500">
        <AiFillCaretRight />
      </span>
    );
  }, [groupOrder, isAlways, isGrp]);

  return (
    <div
      className={cn('typography-body3 leading-snug', 'text-neutral-700')}
      style={{ paddingLeft: `${line.depth * 12}px` }}
    >
      {prefix}
      {isGrp ? (
        <span className="font-medium text-neutral-600">{line.text}</span>
      ) : line.segments?.length ? (
        line.segments.map((s: NonNullable<ConditionLine['segments']>[number], idx: number) => (
          <ConditionSegment key={idx} text={s.text} kind={s.kind} />
        ))
      ) : (
        <span>{line.text}</span>
      )}
    </div>
  );
}

interface ConditionSegmentProps {
  text: string;
  kind: NonNullable<ConditionLine['segments']>[number]['kind'];
}

function ConditionSegment({ text, kind }: ConditionSegmentProps) {
  return (
    <span
      className={cn({
        'font-medium text-primary-700 bg-primary-200 p-0.5 rounded-sm': kind === 'field',
        'text-neutral-500': kind === 'operator',
        'text-neutral-800': kind === 'value',
        'text-neutral-700': kind === 'plain',
      })}
    >
      {text}
    </span>
  );
}

// Inline segment builder (duplicated logic) ---------------------------
const OPERATOR_PHRASES_INLINE: Record<string, string> = {
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

const NO_VALUE_OPERATORS_INLINE = new Set([
  'is_empty',
  'is_filled',
  'is_valid',
  'is_invalid',
  'is_true',
  'is_false',
]);

export function buildSegmentsInline(
  node: ConditionNode,
  ctx: { fieldLabelMap: Map<string, string> },
) {
  const segs: NonNullable<ConditionLine['segments']> = [];
  const left = node.left;
  if (left.kind === 'fieldValue') {
    const label = ctx.fieldLabelMap.get(left.field) || left.field || 'Field';
    segs.push({ text: label, kind: 'field' });
  } else {
    segs.push({ text: left.kind, kind: 'plain' });
  }
  const opRaw = node.operator as string;
  const opPhrase = OPERATOR_PHRASES_INLINE[opRaw] || opRaw.replaceAll('_', ' ');
  segs.push({ text: ` ${opPhrase}`, kind: 'operator' });
  if (!NO_VALUE_OPERATORS_INLINE.has(opRaw)) {
    const right = node.right as Operand | Operand[] | undefined;
    if (right) {
      if (Array.isArray(right)) {
        const rightArr = right as Operand[];
        rightArr.forEach((operand, idx) => {
          const isField = operand.kind === 'fieldValue';
          if (idx === 0) segs.push({ text: ' ', kind: 'plain' });
          const text =
            operand.kind === 'constant'
              ? (() => {
                  try {
                    if (typeof operand.value === 'string')
                      return `'${truncateInline(operand.value)}'`;
                    return JSON.stringify(operand.value);
                  } catch {
                    return 'value';
                  }
                })()
              : operand.kind === 'fieldValue'
                ? ctx.fieldLabelMap.get(operand.field) || operand.field
                : operand.kind === 'fieldState'
                  ? `${ctx.fieldLabelMap.get(operand.field) || operand.field} ${operand.state}`
                  : operand.kind === 'fieldLength'
                    ? `${ctx.fieldLabelMap.get(operand.field) || operand.field} length`
                    : operand.kind === 'now'
                      ? 'now'
                      : operand.kind === 'today'
                        ? 'today'
                        : operand.kind === 'env'
                          ? `$${operand.name}`
                          : 'value';
          segs.push({ text, kind: isField ? 'field' : 'value' });
          if (idx < rightArr.length - 1) segs.push({ text: ', ', kind: 'plain' });
        });
      } else {
        const operand = right;
        const isField = operand && operand.kind === 'fieldValue';
        let text: string;
        if (!operand) text = '';
        else if (operand.kind === 'constant') {
          try {
            text =
              typeof operand.value === 'string'
                ? `'${truncateInline(operand.value)}'`
                : JSON.stringify(operand.value);
          } catch {
            text = 'value';
          }
        } else if (operand.kind === 'fieldValue')
          text = ctx.fieldLabelMap.get(operand.field) || operand.field;
        else if (operand.kind === 'fieldState')
          text = `${ctx.fieldLabelMap.get(operand.field) || operand.field} ${operand.state}`;
        else if (operand.kind === 'fieldLength')
          text = `${ctx.fieldLabelMap.get(operand.field) || operand.field} length`;
        else if (operand.kind === 'now') text = 'now';
        else if (operand.kind === 'today') text = 'today';
        else if (operand.kind === 'env') text = `$${operand.name}`;
        else text = 'value';
        if (text) {
          segs.push({ text: ' ', kind: 'plain' });
          segs.push({ text, kind: isField ? 'field' : 'value' });
        }
      }
    }
  }
  return segs;
}

function truncateInline(s: string, max = 24) {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}
