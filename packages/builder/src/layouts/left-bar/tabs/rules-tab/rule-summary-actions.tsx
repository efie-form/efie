import { cn } from '../../../../lib/utils';
import type { ActionLine } from './rule-helpers';

export interface ActionsListProps {
  lines: ActionLine[];
}

export function ActionsList({ lines }: ActionsListProps) {
  if (!lines.length) return null;
  return (
    <div className="mt-2 flex flex-col gap-1">
      {lines.map((line, idx) => (
        <ActionLineRow key={idx} line={line} />
      ))}
    </div>
  );
}

interface ActionLineRowProps {
  line: ActionLine;
}

function ActionLineRow({ line }: ActionLineRowProps) {
  return (
    <div className="typography-body3 leading-snug text-neutral-600">
      <span className="me-1 rounded-sm bg-neutral-200 px-1 py-0.5 text--700">DO</span>
      {line.segments?.length ? (
        line.segments.map((s, idx: number) => (
          <ActionSegment key={idx} text={s.text} kind={s.kind} />
        ))
      ) : (
        <span className="text-neutral-700">{line.text}</span>
      )}
    </div>
  );
}

interface ActionSegmentProps {
  text: string;
  kind: NonNullable<ActionLine['segments']>[number]['kind'];
}

function ActionSegment({ text, kind }: ActionSegmentProps) {
  return (
    <span
      className={cn({
        'font-medium text-primary-700': kind === 'field',
        'text-neutral-500': kind === 'operator',
        'text-neutral-800': kind === 'value',
        'text-neutral-700': kind === 'plain',
      })}
    >
      {text}
    </span>
  );
}
