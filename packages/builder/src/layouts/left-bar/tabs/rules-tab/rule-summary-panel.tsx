import type { Rule } from '@efie-form/core';
import { buildMultilineSummary } from './rule-helpers';

export interface RuleSummaryPanelProps {
  rule: Rule;
  fieldLabelMap: Map<string, string>;
}

export function RuleSummaryPanel({ rule, fieldLabelMap }: RuleSummaryPanelProps) {
  const { conditions, actions } = buildMultilineSummary(rule, { fieldLabelMap });

  return (
    <div className="flex flex-1 flex-col gap-1 text-start">
      {conditions.map((c, i) => (
        <div key={i} className="typography-body3 leading-snug text-neutral-700">
          <span className="me-1 rounded-sm bg-neutral-200 px-1 py-0.5 text-neutral-700">IF</span>
          <span>{c}</span>
        </div>
      ))}
      <div className="typography-body3 mt-1 text-neutral-500">
        <span className="me-1">THEN</span>
        <span className="text-neutral-700">{actions || 'No actions'}</span>
      </div>
    </div>
  );
}
