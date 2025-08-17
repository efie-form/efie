import {
  type Action,
  type FormField,
  type HideFieldsAction,
  PropertyType,
  RuleAction,
  type SetRequiredAction,
  type ShowFieldsAction,
} from '@efie-form/core';
import { useCallback, useMemo } from 'react';
import { Input, StyledSelect, Switch } from '../../../../../components/form';
import { FIELDS_NAME } from '../../../../../lib/constant';
import { fieldIcons } from '../../../../../lib/fields-tab/fields';
import { useSchemaStore } from '../../../../../lib/state/schema.state';
import { useSettingsStore } from '../../../../../lib/state/settings.state';
import { cn, getFieldProp } from '../../../../../lib/utils';

type FieldActionType = Exclude<Action['type'], 'custom'>; // supported in UI for now
const ACTION_OPTIONS: { value: FieldActionType; label: string }[] = [
  { value: RuleAction.SHOW_FIELDS, label: 'Show fields' },
  { value: RuleAction.HIDE_FIELDS, label: 'Hide fields' },
  { value: RuleAction.SET_REQUIRED, label: 'Set required' },
  { value: RuleAction.SET_OPTIONAL, label: 'Set optional' },
];

// Determines if action type needs a boolean value input
const actionNeedsValue = (type: FieldActionType) =>
  type === RuleAction.SET_REQUIRED || type === RuleAction.SET_OPTIONAL;

// Type guards
// Local mirror of SetOptionalAction since it's not exported (avoid "any").
interface SetOptionalActionLocal {
  id: string;
  type: typeof RuleAction.SET_OPTIONAL;
  fields: string[];
  value: boolean;
}

type FieldAction = ShowFieldsAction | HideFieldsAction | SetRequiredAction | SetOptionalActionLocal;
function isFieldAction(a: Action): a is FieldAction {
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

  const fieldOptions = useMemo(
    () =>
      allFields.map((field) => {
        const Icon = fieldIcons[field.type];
        return {
          value: field.id,
          // Prefer label prop; fallback to generic name + id
          label:
            (getFieldProp(field, PropertyType.LABEL)?.value as string | undefined) ||
            `${FIELDS_NAME[field.type]} #${field.id}`,
          Icon,
        };
      }),
    [allFields],
  );

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
        {fieldActions.map((action) => {
          const needsValue = actionNeedsValue(action.type as FieldActionType);
          return (
            <div
              key={action.id}
              className="rounded-md border border-neutral-100 bg-neutral-50 p-3 shadow-inner"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="typography-body2 text-neutral-700">
                  Action #{actions.findIndex((a) => a.id === action.id) + 1}
                </p>
                <button
                  type="button"
                  className="typography-body4 text-danger-600 hover:underline"
                  onClick={() => removeAction(rule.id, action.id)}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Action type */}
                <div className="sm:col-span-1">
                  <p className="typography-body3 mb-1 text-neutral-600">Type</p>
                  <StyledSelect
                    options={ACTION_OPTIONS.slice()}
                    value={action.type as FieldActionType}
                    onChange={(nextType: FieldActionType) => {
                      if (nextType === action.type) return;
                      if (
                        nextType === RuleAction.SHOW_FIELDS ||
                        nextType === RuleAction.HIDE_FIELDS
                      ) {
                        const reset: Omit<ShowFieldsAction | HideFieldsAction, 'id'> = {
                          type: nextType,
                          fields: [],
                        } as Omit<ShowFieldsAction | HideFieldsAction, 'id'>;
                        updateAction(rule.id, action.id, reset);
                      } else {
                        const reset: Omit<SetRequiredAction | SetOptionalActionLocal, 'id'> = {
                          type: nextType as
                            | typeof RuleAction.SET_REQUIRED
                            | typeof RuleAction.SET_OPTIONAL,
                          fields: [],
                          value: true,
                        };
                        updateAction(rule.id, action.id, reset);
                      }
                    }}
                  />
                </div>
                {/* Target fields */}
                <div className="sm:col-span-1">
                  <p className="typography-body3 mb-1 text-neutral-600">Fields</p>
                  <StyledSelect
                    multiple
                    options={fieldOptions}
                    value={action.fields}
                    onChange={(ids: string[]) => {
                      if (
                        action.type === RuleAction.SET_REQUIRED ||
                        action.type === RuleAction.SET_OPTIONAL
                      ) {
                        const next: Omit<SetRequiredAction | SetOptionalActionLocal, 'id'> = {
                          type: action.type,
                          fields: ids,
                          value: (action as SetRequiredAction | SetOptionalActionLocal).value,
                        };
                        updateAction(rule.id, action.id, next);
                      } else {
                        const next: Omit<ShowFieldsAction | HideFieldsAction, 'id'> = {
                          type: action.type,
                          fields: ids,
                        } as Omit<ShowFieldsAction | HideFieldsAction, 'id'>;
                        updateAction(rule.id, action.id, next);
                      }
                    }}
                    searchable
                  />
                </div>
                {/* Value toggle when needed */}
                {needsValue && (
                  <div className="sm:col-span-1">
                    <p className="typography-body3 mb-1 text-neutral-600">Value</p>
                    <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-2 py-1">
                      <Switch
                        checked={
                          (action as SetRequiredAction | SetOptionalActionLocal).value ?? true
                        }
                        onChange={(v) => {
                          if (
                            action.type === RuleAction.SET_REQUIRED ||
                            action.type === RuleAction.SET_OPTIONAL
                          ) {
                            const next: Omit<SetRequiredAction | SetOptionalActionLocal, 'id'> = {
                              type: action.type,
                              fields: action.fields,
                              value: v,
                            };
                            updateAction(rule.id, action.id, next);
                          }
                        }}
                      />
                      <span className="typography-body3 text-neutral-700">
                        {(action as SetRequiredAction | SetOptionalActionLocal).value
                          ? 'True'
                          : 'False'}
                      </span>
                    </div>
                  </div>
                )}
                {/* For actions without value, optionally expose free-form value (future custom) */}
                {!needsValue && (
                  <div className="sm:col-span-1">
                    <p className="typography-body3 mb-1 text-neutral-600">Value</p>
                    <Input
                      disabled
                      placeholder="N/A"
                      value=""
                      inputProps={{ 'aria-disabled': true }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionsPanel;
