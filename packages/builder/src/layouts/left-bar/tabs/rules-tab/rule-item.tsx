import { useSortable } from '@dnd-kit/sortable';
import type { Rule } from '@efie-form/core';
import type { CSSProperties } from 'react';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { cn } from '../../../../lib/utils';
import RuleActionSummary from './rule-action-summary';
import RuleIfSummary from './rule-if-summary';

export interface RuleItemProps {
  rule: Rule;
}

export function RuleItem({ rule }: RuleItemProps) {
  const { setSelectedConditionId, setMode } = useSettingsStore();
  const selectedConditionId = useSettingsStore((state) => state.selectedConditionId);
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id: rule.id,
  });

  const style: CSSProperties = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  };

  return (
    <button
      type="button"
      style={style}
      ref={setNodeRef}
      {...attributes}
      className={cn(
        'group relative flex w-full px-1 py-2 text-left gap-1 hover:bg-neutral-100 focus:outline-hidden border-b border-neutral-100',
        isDragging ? 'z-50 shadow-lg' : 'cursor-pointer',
        {
          'bg-neutral-100': selectedConditionId === rule.id,
        },
      )}
      onClick={() => {
        setMode('conditions');
        setSelectedConditionId(rule.id);
      }}
    >
      <span
        className={cn('h-5 w-5 shrink-0 invisible group-hover:visible text-neutral-700', {
          'cursor-grab': !isDragging,
        })}
        {...listeners}
      >
        <MdOutlineDragIndicator />
      </span>

      <div className="flex flex-1 flex-col gap-1 text-start">
        <RuleIfSummary tree={rule.when} />
        <RuleActionSummary actions={rule.actions || []} />
      </div>
    </button>
  );
}
