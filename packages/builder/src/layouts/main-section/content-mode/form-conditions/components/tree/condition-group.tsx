import { useMemo } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { SimpleMenu } from '../../../../../../components/elements/dropdown-menu';
import { cn } from '../../../../../../lib/utils';
import ConditionNodeEditor, { type ConditionNodeUI } from './condition-node';

export type GroupMode = 'all' | 'any';

export interface ConditionTreeUI {
  logic: GroupMode; // 'all' -> and, 'any' -> or
  children: Array<ConditionTreeUI | ConditionNodeUI>;
}

interface ConditionGroupProps {
  tree: ConditionTreeUI;
  mode: GroupMode; // which array to use
  onChange: (tree: ConditionTreeUI) => void;
  onRemove: () => void;
}

function isGroup(node: ConditionTreeUI | ConditionNodeUI): node is ConditionTreeUI {
  return (
    (node as ConditionTreeUI).logic !== undefined &&
    Array.isArray((node as ConditionTreeUI).children)
  );
}

export default function ConditionGroup({ tree, mode, onChange, onRemove }: ConditionGroupProps) {
  const items = useMemo(() => tree.children ?? [], [tree]);

  const updateItems = (next: Array<ConditionTreeUI | ConditionNodeUI>) => {
    const updated: ConditionTreeUI = { ...tree, children: next };
    onChange(updated);
  };

  const addCondition = () => {
    updateItems([
      ...items,
      {
        left: { kind: 'fieldValue', field: '' },
        operator: 'equal',
      },
    ]);
  };
  const addGroupAnd = () => {
    updateItems([
      ...items,
      {
        logic: 'all',
        children: [
          {
            left: {
              kind: 'fieldValue',
              field: '',
            },
            operator: 'equal',
          },
        ],
      },
    ]);
  };

  const handleInlineModeChange = (next: GroupMode) => {
    if (next === mode) return;
    onChange({ logic: next, children: items });
  };

  const handleRemoveInlineNode = (idx: number) => {
    const newItems = items.filter((_, i) => i !== idx);
    if (!newItems.length) {
      onRemove();
    } else {
      updateItems(newItems);
    }
  };

  return (
    <div
      className={cn(
        'rounded-md border border-neutral-200 bg-white p-4 shadow-sm space-y-3 relative',
      )}
    >
      <div className="flex items-start gap-2 w-full">
        <div className="space-y-3 w-full">
          {items.map((n, idx) => (
            <div key={idx} className="flex justify-between gap-4">
              <div className="w-16">
                {idx === 0 && <p className="text-end typography-body2">When</p>}
                {idx === 1 && (
                  <div className="flex">
                    <select
                      className="typography-body2 rounded border border-neutral-300 bg-white px-2 py-1 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={mode}
                      onChange={(e) => handleInlineModeChange(e.target.value as GroupMode)}
                    >
                      <option value="all">AND</option>
                      <option value="any">OR</option>
                    </select>
                  </div>
                )}
                {idx >= 2 && (
                  <p className="text-end typography-body2">{mode === 'all' ? 'AND' : 'OR'}</p>
                )}
              </div>
              <div className="flex-1">
                {isGroup(n) ? (
                  <ConditionGroup
                    tree={n}
                    mode={n.logic}
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
              <div className="">
                <SimpleMenu
                  trigger={
                    <button type="button" className="typography-button2 text-neutral-600">
                      <HiDotsHorizontal />
                    </button>
                  }
                  items={[
                    { key: 'remove', label: 'Remove', onSelect: () => handleRemoveInlineNode(idx) },
                  ]}
                  align="end"
                />
              </div>
            </div>
          ))}
          {/* Add button with dropdown */}
          <SimpleMenu
            align="start"
            trigger={
              <button type="button" className="typography-button2 text-primary-600">
                + Add
              </button>
            }
            items={[
              { key: 'condition', label: 'Condition', onSelect: addCondition },
              { key: 'group', label: 'Group', onSelect: addGroupAnd },
            ]}
            contentClassName="w-44"
          />
        </div>
      </div>
    </div>
  );
}
