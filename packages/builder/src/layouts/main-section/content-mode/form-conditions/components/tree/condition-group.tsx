import type { ConditionTree } from '@efie-form/core';
import { useMemo } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { SimpleMenu } from '../../../../../../components/elements/dropdown-menu';
import { StyledSelect } from '../../../../../../components/form';
import { cn } from '../../../../../../lib/utils';
import type { ConditionNodeUI } from './condition-node';
import ConditionNodeEditor from './condition-node';

export type GroupMode = ConditionTree['logic'];

export interface ConditionTreeUI {
  logic: GroupMode;
  children: Array<ConditionTreeUI | ConditionNodeUI>;
}

interface ConditionGroupProps {
  tree: ConditionTreeUI;
  mode: GroupMode; // which array to use
  onChange: (tree: ConditionTreeUI) => void;
  onRemove: () => void;
}

function isGroup(node: ConditionTreeUI | ConditionNodeUI): node is ConditionTreeUI {
  const maybe = node as Partial<ConditionTreeUI> & { children?: unknown };
  return typeof maybe.logic === 'string' && Array.isArray(maybe.children);
}

export default function ConditionGroup({ tree, mode, onChange, onRemove }: ConditionGroupProps) {
  const items = useMemo(() => tree.children ?? [], [tree]);

  const updateItems = (next: Array<ConditionTreeUI | ConditionNodeUI>) => {
    onChange({ ...tree, children: next });
  };

  const addCondition = () => {
    const indexBeforeGroup = items.findIndex((item) => isGroup(item));
    const newItem: ConditionNodeUI = {
      left: { kind: 'fieldValue', field: '' },
    };
    if (indexBeforeGroup >= 0) {
      items.splice(indexBeforeGroup, 0, newItem);
    } else {
      items.push(newItem);
    }

    updateItems(items);
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

  const handleDuplicateInlineNode = (idx: number) => {
    const newItems = [...items];
    const node = newItems[idx];
    const clone = (n: ConditionTreeUI | ConditionNodeUI): typeof n =>
      isGroup(n) ? { logic: n.logic, children: n.children.map(clone) } : { ...n };
    newItems.splice(idx + 1, 0, clone(node));
    updateItems(newItems);
  };

  return (
    <div
      className={cn(
        'rounded-md border border-neutral-200 bg-white p-4 shadow-xs space-y-3 relative',
      )}
    >
      <div className="flex items-start gap-2 w-full">
        <div className="space-y-3 w-full">
          {items.map((n, idx) => (
            <div key={idx} className="flex justify-between gap-4">
              <div className="w-16">
                {idx === 0 && <p className="text-end typography-body2 text-neutral-700">When</p>}
                {idx === 1 && (
                  <div className="flex">
                    <StyledSelect
                      options={[
                        { value: 'all', label: 'AND' },
                        { value: 'any', label: 'OR' },
                      ]}
                      value={mode}
                      onChange={(newValue) => handleInlineModeChange(newValue)}
                      dropdownMinWidth={74}
                    />
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
                    {
                      key: 'duplicate',
                      label: 'Duplicate',
                      onSelect: () => handleDuplicateInlineNode(idx),
                    },
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
