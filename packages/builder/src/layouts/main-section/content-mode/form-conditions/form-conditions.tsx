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
  const setRuleBranch = useSchemaStore((s) => s.setRuleBranch);
  const updateRuleBranch = useSchemaStore((s) => s.updateRuleBranch);
  const clearRuleBranch = useSchemaStore((s) => s.clearRuleBranch);

  if (!rule) return;

  const handleEnsureBranch = () => {
    if (rule.branch) return;
    setRuleBranch(rule.id, {
      when: {
        logic: 'and',
        children: [
          {
            logic: 'and',
            children: [
              {
                left: { kind: 'fieldValue', field: '' },
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

      {/* Single Branch (If) */}
      <div className={cn('space-y-3 sm:space-y-4')}>
        {!rule.branch && (
          <div
            className={cn(
              'rounded-md border border-dashed border-neutral-300 p-3 text-center sm:p-4',
            )}
          >
            <p className="typography-body2 mb-2 text-neutral-600">No condition yet</p>
            <button
              type="button"
              className="typography-button2 text-primary-600"
              onClick={handleEnsureBranch}
            >
              + Add condition
            </button>
          </div>
        )}

        {rule.branch && (
          <div className={cn('rounded-md border border-neutral-200 bg-white p-3 shadow-sm sm:p-4')}>
            {/* IF block */}
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="typography-body1 flex-1">If</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="typography-button2 text-danger-600"
                  onClick={() => clearRuleBranch(rule.id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <ConditionGroup
                tree={toUi(rule.branch.when as ConditionTree)}
                mode={(rule.branch.when as ConditionTree).logic === 'or' ? 'any' : 'all'}
                onChange={(next) => updateRuleBranch(rule.id, { when: toEngine(next) })}
                onRemove={() => clearRuleBranch(rule.id)}
              />
            </div>
            {/* THEN block */}
            <Divider className="my-4">
              <p className="typography-body2 text-neutral-700">Then</p>
            </Divider>
            <ActionsPanel />
          </div>
        )}
      </div>
    </div>
  );
}
