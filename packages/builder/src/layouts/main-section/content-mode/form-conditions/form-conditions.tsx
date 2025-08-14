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
  const updateRuleBranch = useSchemaStore((s) => s.updateRuleBranch);
  const clearRuleBranch = useSchemaStore((s) => s.clearRuleBranch);

  if (!rule) return;

  return (
    <div className="px-3 py-4 sm:px-4 sm:py-6">
      {/* Header */}
      <RuleHeader
        id={rule.id}
        enabled={rule.enabled}
        onToggleEnabled={(v) => updateRule(rule.id, { enabled: v })}
      />

      <div className={cn('space-y-3 sm:space-y-4')}>
        {/* IF block */}
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
    </div>
  );
}
