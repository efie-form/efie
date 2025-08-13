import type { Operator } from '@efie-form/core';
import { useMemo } from 'react';
import { cn } from '../../../../../../lib/utils';
import ConditionNodeEditor, { type ConditionNodeUI } from './condition-node';

export type GroupMode = 'all' | 'any';

export interface ConditionTreeUI {
  all?: Array<ConditionTreeUI | ConditionNodeUI>;
  any?: Array<ConditionTreeUI | ConditionNodeUI>;
  not?: ConditionTreeUI;
}

interface ConditionGroupProps {
  tree: ConditionTreeUI;
  mode: GroupMode; // which array to use
  onChange: (tree: ConditionTreeUI) => void;
  onRemove?: () => void;
}

function isGroup(node: ConditionTreeUI | ConditionNodeUI): node is ConditionTreeUI {
  return (
    !!(node as ConditionTreeUI).all ||
    !!(node as ConditionTreeUI).any ||
    !!(node as ConditionTreeUI).not
  );
}

export default function ConditionGroup({ tree, mode, onChange, onRemove }: ConditionGroupProps) {
  const items = useMemo(() => (mode === 'all' ? (tree.all ?? []) : (tree.any ?? [])), [tree, mode]);

  const updateItems = (next: Array<ConditionTreeUI | ConditionNodeUI>) => {
    const updated: ConditionTreeUI = { ...tree };
    if (mode === 'all') updated.all = next;
    else updated.any = next;
    onChange(updated);
  };

  return (
    <div className={cn('rounded-md border border-neutral-200 bg-white p-4 shadow-sm space-y-3')}>
      <div className="flex items-center justify-between">
        <p className="typography-body2">
          {mode === 'all' ? 'ALL of the following (AND)' : 'ANY of the following (OR)'}
        </p>
        <div className="space-x-2">
          <button
            type="button"
            className="typography-button2 text-primary-600"
            onClick={() =>
              updateItems([
                ...items,
                {
                  left: { kind: 'fieldValue', field: '' },
                  operator: 'equal' as unknown as Operator,
                },
              ])
            }
          >
            + Condition
          </button>
          <button
            type="button"
            className="typography-button2 text-primary-600"
            onClick={() => updateItems([...items, { all: [] }])}
          >
            + Group (AND)
          </button>
          <button
            type="button"
            className="typography-button2 text-primary-600"
            onClick={() => updateItems([...items, { any: [] }])}
          >
            + Group (OR)
          </button>
          {onRemove ? (
            <button type="button" className="typography-button2 text-danger-600" onClick={onRemove}>
              Remove group
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((n, idx) => (
          <div key={idx} className="rounded-md border border-neutral-100 p-3">
            {isGroup(n) ? (
              <ConditionGroup
                tree={n}
                mode={n.all ? 'all' : 'any'}
                onChange={(next) => updateItems(items.map((it, i) => (i === idx ? next : it)))}
                onRemove={() => updateItems(items.filter((_, i) => i !== idx))}
              />
            ) : (
              <ConditionNodeEditor
                node={n}
                onChange={(next) => updateItems(items.map((it, i) => (i === idx ? next : it)))}
                onRemove={() => updateItems(items.filter((_, i) => i !== idx))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
