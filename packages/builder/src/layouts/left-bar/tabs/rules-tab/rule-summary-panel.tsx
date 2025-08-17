import type { Rule } from '@efie-form/core';
import { useMemo } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import { cn } from '../../../../lib/utils';
import { type ActionLine, buildStructuredSummary } from './rule-helpers';

export interface RuleSummaryPanelProps {
  rule: Rule;
  fieldLabelMap: Map<string, string>;
}

export function RuleSummaryPanel({ rule, fieldLabelMap }: RuleSummaryPanelProps) {
  const { conditionLines, actionLines } = useMemo(
    () => buildStructuredSummary(rule, { fieldLabelMap }),
    [rule, fieldLabelMap],
  );

  // Track how many group headers encountered to decide IF vs ELSE IF
  let groupCount = 0;

  return (
    <div className="flex flex-1 flex-col gap-1 text-start">
      {conditionLines.map((line, i) => {
        const segments = line.segments;
        const isGroup = line.kind === 'group';
        const isAlways = line.text === 'Always' && !conditionLines.some((l) => l.kind === 'group');
        let prefix: JSX.Element | null = null;
        if (isGroup) {
          const thisGroupIndex = groupCount++;
          prefix = (
            <span className="me-1 rounded-sm bg-neutral-200 px-1 py-0.5 text-neutral-700">
              {thisGroupIndex === 0 ? 'IF' : 'ELSE IF'}
            </span>
          );
        } else if (isAlways) {
          prefix = (
            <span className="me-1 rounded-sm bg-neutral-200 px-1 py-0.5 text-neutral-700">IF</span>
          );
        } else {
          // condition line (non-group)
          prefix = (
            <span className="me-1 inline-flex items-center text-neutral-500">
              <AiFillCaretRight />
            </span>
          );
        }
        return (
          <div
            key={i}
            className={cn(
              'typography-body3 leading-snug',
              isGroup ? 'text-neutral-700' : 'text-neutral-700',
            )}
            style={{ paddingLeft: `${line.depth * 12}px` }}
          >
            {prefix}
            {isGroup ? (
              <span className="font-medium text-neutral-600">{line.text}</span>
            ) : segments?.length ? (
              segments.map((s, idx) => (
                <span
                  key={idx}
                  className={cn({
                    'font-medium text-primary-700 bg-primary-200 p-0.5 rounded-sm':
                      s.kind === 'field',
                    'text-neutral-500': s.kind === 'operator',
                    'text-neutral-800': s.kind === 'value',
                    'text-neutral-700': s.kind === 'plain',
                  })}
                >
                  {s.text}
                </span>
              ))
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        );
      })}
      <div className="mt-2 flex flex-col gap-1">
        {actionLines.map((a: ActionLine, idx) => (
          <div key={idx} className="typography-body3 leading-snug text-neutral-600">
            <span className="me-1 rounded-sm bg-neutral-200 px-1 py-0.5 text--700">DO</span>
            {a.segments?.length ? (
              a.segments.map((s, i2) => (
                <span
                  key={i2}
                  className={cn({
                    'font-medium text-primary-700': s.kind === 'field',
                    'text-neutral-500': s.kind === 'operator',
                    'text-neutral-800': s.kind === 'value',
                    'text-neutral-700': s.kind === 'plain',
                  })}
                >
                  {s.text}
                </span>
              ))
            ) : (
              <span className="text-neutral-700">{a.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
