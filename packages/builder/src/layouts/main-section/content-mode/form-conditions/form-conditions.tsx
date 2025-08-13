import type { ConditionTree } from '@efie-form/core';
import Divider from '../../../../components/elements/divider';
import { useSchemaStore } from '../../../../lib/state/schema.state';
import { useSettingsStore } from '../../../../lib/state/settings.state';
import { cn } from '../../../../lib/utils';
import ActionsPanel from './components/actions-panel';
import RuleHeader from './components/rule-header';
import ConditionGroup from './components/tree/condition-group';
import { toEngine, toUi } from './components/tree/convert';

export default function FormConditions() {
  const selectedConditionId = useSettingsStore((state) => state.selectedConditionId);
  const rule = useSchemaStore((state) => state.findRuleById(selectedConditionId));
  const updateRule = useSchemaStore((state) => state.updateRule);
  const addRuleBranch = useSchemaStore((s) => s.addRuleBranch);
  const updateRuleBranch = useSchemaStore((s) => s.updateRuleBranch);
  const removeRuleBranch = useSchemaStore((s) => s.removeRuleBranch);

  if (!rule) return;
  const branches = rule.branches ?? [];

  const handleAddBranch = () => {
    addRuleBranch(rule.id, {
      when: {
        logic: 'and',
        children: [
          {
            logic: 'and',
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
        ],
      },
      actions: [],
    });
  };

  return (
    <div className="px-3 py-4 sm:px-4 sm:py-6">
      {/* Header */}
      <RuleHeader
        id={rule.id}
        enabled={rule.enabled}
        onToggleEnabled={(v) => updateRule(rule.id, { enabled: v })}
      />

      {/* Branches (If / Else-if) with nested groups */}
      <div className={cn('space-y-3 sm:space-y-4')}>
        {branches.length === 0 && (
          <div
            className={cn(
              'rounded-md border border-dashed border-neutral-300 p-3 text-center sm:p-4',
            )}
          >
            <p className="typography-body2 mb-2 text-neutral-600">No branches yet</p>
            <button
              type="button"
              className="typography-button2 text-primary-600"
              onClick={handleAddBranch}
            >
              + Add If branch
            </button>
          </div>
        )}

        {branches.map((b, idx) => (
          <div
            key={idx}
            className={cn('rounded-md border border-neutral-200 bg-white p-3 shadow-sm sm:p-4')}
          >
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="typography-body1 flex-1">{idx === 0 ? 'If' : 'Else if'}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="typography-button2 text-danger-600"
                  onClick={() => removeRuleBranch(rule.id, idx)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <ConditionGroup
                tree={toUi(b.when as ConditionTree)}
                mode={(b.when as ConditionTree).logic === 'or' ? 'any' : 'all'}
                onChange={(next) => updateRuleBranch(rule.id, idx, { when: toEngine(next) })}
                onRemove={() => removeRuleBranch(rule.id, idx)}
              />
            </div>
            <div className="mt-3">
              <ActionsPanel />
            </div>
          </div>
        ))}

        {branches.length > 0 ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="typography-button2 text-primary-600"
                onClick={handleAddBranch}
              >
                + Add Else-if
              </button>
              <button type="button" className="typography-button2 text-neutral-600" disabled>
                Else actions (coming soon)
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <Divider className="my-4">
        <p className="typography-body2 text-neutral-700">Then</p>
      </Divider>

      {/* Then (Actions) - top-level kept for now */}
      <ActionsPanel />
    </div>
  );
}
