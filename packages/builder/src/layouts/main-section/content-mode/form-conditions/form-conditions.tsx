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

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <RuleHeader
        id={rule.id}
        enabled={rule.enabled}
        onToggleEnabled={(v) => updateRule(rule.id, { enabled: v })}
      />

      {/* Branches (If / Else-if) with nested groups */}
      <div className={cn('space-y-4')}>
        {branches.length === 0 ? (
          <div className={cn('rounded-md border border-dashed border-neutral-300 p-4 text-center')}>
            <p className="typography-body2 mb-2 text-neutral-600">No branches yet</p>
            <button
              type="button"
              className="typography-button2 text-primary-600"
              onClick={() => addRuleBranch(rule.id, { when: { all: [] }, actions: [] })}
            >
              + Add If branch
            </button>
          </div>
        ) : null}

        {branches.map((b, idx) => (
          <div
            key={idx}
            className={cn('rounded-md border border-neutral-200 bg-white p-4 shadow-sm')}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="typography-body1">{idx === 0 ? 'If' : 'Else if'}</p>
              <div className="space-x-2">
                <button
                  type="button"
                  className="typography-button2 text-danger-600"
                  onClick={() => removeRuleBranch(rule.id, idx)}
                >
                  Remove
                </button>
              </div>
            </div>
            <ConditionGroup
              tree={toUi(b.when as ConditionTree)}
              mode={(b.when as unknown as { any?: unknown }).any !== undefined ? 'any' : 'all'}
              onChange={(next) => updateRuleBranch(rule.id, idx, { when: toEngine(next) })}
            />
            <div className="mt-3">
              <ActionsPanel />
            </div>
          </div>
        ))}

        {branches.length > 0 ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="typography-button2 text-primary-600"
              onClick={() => addRuleBranch(rule.id, { when: { all: [] }, actions: [] })}
            >
              + Add Else-if
            </button>
            <button type="button" className="typography-button2 text-neutral-600" disabled>
              Else actions (coming soon)
            </button>
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
