import { type Action, type FormField, RuleAction, type ShowFieldsAction } from '@efie-form/core';
import { useCallback, useMemo } from 'react';
import { useSchemaStore } from '../../../../../lib/state/schema.state';
import { useSettingsStore } from '../../../../../lib/state/settings.state';
import { cn } from '../../../../../lib/utils';
import { ActionItem, type FieldAction } from './action-item';

function isFieldAction(a: Action): boolean {
  return a.type !== 'custom';
}

const ActionsPanel = () => {
  const selectedRuleId = useSettingsStore((s) => s.selectedConditionId);
  const rule = useSchemaStore((s) => s.findRuleById(selectedRuleId));
  const addAction = useSchemaStore((s) => s.addAction);
  const updateAction = useSchemaStore((s) => s.updateAction);
  const removeAction = useSchemaStore((s) => s.removeAction);
  const fieldsTree = useSchemaStore((s) => s.schema?.form.fields);

  const allFields = useMemo<FormField[]>(() => {
    if (!fieldsTree) return [];
    const stack: FormField[] = [...fieldsTree];
    const out: FormField[] = [];
    while (stack.length) {
      const f = stack.shift();
      if (!f) continue;
      out.push(f);
      // Some field types may have children (layout/group). Use optional chaining.
      const children = (f as unknown as { children?: FormField[] }).children;
      if (children?.length) stack.unshift(...children);
    }
    return out;
  }, [fieldsTree]);

  // Provide flattened list directly; ActionItem will compute filtered options
  const flattenedFields = allFields;

  const handleAdd = useCallback(() => {
    if (!rule) return;
    const newAction: Omit<ShowFieldsAction, 'id'> = { type: RuleAction.SHOW_FIELDS, fields: [] };
    addAction(rule.id, newAction);
  }, [rule, addAction]);

  if (!rule) return null;
  const actions = (rule.actions ?? []) as Action[];
  const fieldActions = actions.filter(isFieldAction);

  return (
    <div className={cn('rounded-md border border-neutral-200 bg-white p-4 shadow-sm')}>
      <div className="mb-3 flex items-center justify-between">
        <p className="typography-body1">Do</p>
        <button
          type="button"
          onClick={handleAdd}
          className="typography-button2 rounded-md border border-neutral-200 px-2 py-1 text-neutral-700 hover:bg-neutral-50"
        >
          Add action
        </button>
      </div>
      {actions.length === 0 && (
        <p className="typography-body3 mb-3 text-neutral-500">No actions yet.</p>
      )}
      <div className="flex flex-col gap-4">
        {fieldActions.map((action, idx) => (
          <ActionItem
            key={action.id}
            action={action as FieldAction}
            index={idx}
            ruleId={rule.id}
            allFields={flattenedFields}
            onUpdate={(rid, aid, patch) => updateAction(rid, aid, patch as unknown as Action)}
            onRemove={(rid, aid) => removeAction(rid, aid)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionsPanel;
