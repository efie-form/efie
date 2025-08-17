import type { ConditionNode, ConditionTree, Rule } from '@efie-form/core';
import { useMemo } from 'react';
import { type ConditionLine, getActionLines, isGroup, renderConditionNode } from './rule-helpers';
import { ActionsList } from './rule-summary-actions';
import { buildSegmentsInline, ConditionsList } from './rule-summary-conditions';

export interface RuleSummaryPanelProps {
  rule: Rule;
  fieldLabelMap: Map<string, string>;
}

export function RuleSummaryPanel({ rule, fieldLabelMap }: RuleSummaryPanelProps) {
  const { conditionLines, actionLines } = useMemo(() => {
    const ctx = { fieldLabelMap };
    const root: ConditionTree = rule.when
      ? (rule.when as ConditionTree)
      : ({ logic: 'all', children: [] } as ConditionTree);
    const lines: ConditionLine[] = [];

    const walk = (node: ConditionTree | ConditionNode, depth: number) => {
      if (isGroup(node)) {
        if (!node.children.length) {
          lines.push({ text: 'Always', depth, kind: 'condition' });
          return;
        }
        lines.push({
          text: node.logic === 'all' ? 'ALL of:' : 'ANY of:',
          depth,
          kind: 'group',
          logic: node.logic,
        });
        for (const child of node.children) walk(child as ConditionTree | ConditionNode, depth + 1);
      } else {
        const cn = node as ConditionNode;
        lines.push({
          text: renderConditionNode(cn, ctx),
          depth,
          kind: 'condition',
          segments: buildSegmentsInline(cn, ctx),
        });
      }
    };

    walk(root, 0);
    return { conditionLines: lines, actionLines: getActionLines(rule.actions || [], ctx) };
  }, [rule, fieldLabelMap]);

  return (
    <div className="flex flex-1 flex-col gap-1 text-start">
      <ConditionsList lines={conditionLines} />
      <ActionsList lines={actionLines} />
    </div>
  );
}
