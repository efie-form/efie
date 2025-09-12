import type { Action, FormSchema, Rule } from '@efie-form/core';
import type { StateSetters } from './types';
import { deepClone, generateId } from './utils';

export interface SchemaStateRuleActions {
  getAllRules: () => Rule[];
  findRuleById: (ruleId?: string) => Rule | undefined;
  addRule: (rule: Rule, index?: number) => void;
  removeRule: (ruleId: string) => void;
  moveRule: (from: number, to: number) => void;
  updateRule: (ruleId: string, patch: Partial<Rule>) => void;
  setRuleConditions: (ruleId: string, when: Rule['when'], actions: Rule['actions']) => void;
  updateRuleConditions: (ruleId: string, patch: Partial<Pick<Rule, 'when' | 'actions'>>) => void;
  clearRuleConditions: (ruleId: string) => void;
  // Action level helpers (id based)
  addAction: (ruleId: string, action: Omit<Action, 'id'>, index?: number) => Action | undefined;
  updateAction: (ruleId: string, actionId: string, next: Omit<Action, 'id'>) => void;
  removeAction: (ruleId: string, actionId: string) => void;
}

export function createRuleActions({ getState, set }: StateSetters): SchemaStateRuleActions {
  return {
    getAllRules: () => {
      const { schema } = getState();
      return schema?.form.rules ?? [];
    },
    findRuleById: (ruleId) => {
      const { schema } = getState();
      return schema?.form.rules?.find((r) => r.id === ruleId);
    },
    addRule: (rule, index) => {
      const { schema, setSchema } = getState();
      if (!schema) return;

      const newRule = deepClone(rule);
      if (!newRule.id) newRule.id = generateId();

      const rules = schema.form.rules ?? [];
      const newRules = [...rules];
      if (index !== undefined && index >= 0 && index <= newRules.length) {
        newRules.splice(index, 0, newRule);
      } else {
        newRules.push(newRule);
      }

      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };

      setSchema(newSchema);
    },

    removeRule: (ruleId) => {
      const { schema, setSchema } = getState();
      if (!schema || !schema.form.rules?.length) return;
      const newRules = schema.form.rules.filter((r) => r.id !== ruleId);
      if (newRules.length === schema.form.rules.length) return; // no-op

      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
    },

    moveRule: (from, to) => {
      const { schema, setSchema } = getState();
      const rules = schema?.form.rules ?? [];
      if (!schema || rules.length === 0) return;
      if (from < 0 || from >= rules.length || to < 0 || to >= rules.length || from === to) {
        return;
      }
      const newRules = [...rules];
      const [moved] = newRules.splice(from, 1);
      newRules.splice(to, 0, moved);

      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
    },

    updateRule: (ruleId, patch) => {
      const { schema, setSchema } = getState();
      if (!schema || !schema.form.rules?.length) return;
      let changed = false;
      const newRules = schema.form.rules.map((r) => {
        if (r.id === ruleId) {
          changed = true;
          return { ...r, ...patch } as Rule;
        }
        return r;
      });
      if (!changed) return;

      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
    },

    setRuleConditions: (ruleId, when, actions) => {
      const { schema, setSchema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const idx = rules.findIndex((r) => r.id === ruleId);
      if (idx === -1) return;
      const newRules = [...rules];
      newRules[idx] = { ...rules[idx], when: deepClone(when), actions: deepClone(actions) } as Rule;
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
    },

    updateRuleConditions: (ruleId, patch) => {
      const { schema, setSchema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const idx = rules.findIndex((r) => r.id === ruleId);
      if (idx === -1) return;
      const target = rules[idx];
      const newRules = [...rules];
      newRules[idx] = {
        ...target,
        when: patch.when ? patch.when : target.when,
        actions: patch.actions ? patch.actions : target.actions,
      } as Rule;
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
    },

    clearRuleConditions: (ruleId) => {
      const { schema, setSchema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const idx = rules.findIndex((r) => r.id === ruleId);
      if (idx === -1) return;
      const newRules = [...rules];
      newRules[idx] = {
        ...rules[idx],
        when: { logic: 'all', children: [] },
        actions: [],
      } as Rule;
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
    },

    addAction: (ruleId, action, index) => {
      const { schema, setSchema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const ruleIdx = rules.findIndex((r) => r.id === ruleId);
      if (ruleIdx === -1) return;
      const target = rules[ruleIdx];
      const actions = target.actions ? [...target.actions] : [];
      const newAction = { ...deepClone(action), id: generateId() } as Action;
      if (index !== undefined && index >= 0 && index <= actions.length) {
        actions.splice(index, 0, newAction);
      } else {
        actions.push(newAction);
      }
      const newRules = [...rules];
      newRules[ruleIdx] = { ...target, actions } as Rule;
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
      return newAction;
    },

    updateAction: (ruleId, actionId, next) => {
      const { schema, setSchema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const ruleIdx = rules.findIndex((r) => r.id === ruleId);
      if (ruleIdx === -1) return;
      const target = rules[ruleIdx];
      const actions = target.actions ? [...target.actions] : [];
      const actionIdx = actions.findIndex((a) => a.id === actionId);
      if (actionIdx === -1) return;
      const nextAction: Action = { ...(next as Action), id: actionId };
      actions[actionIdx] = nextAction;
      const newRules = [...rules];
      newRules[ruleIdx] = { ...target, actions } as Rule;
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
    },

    removeAction: (ruleId, actionId) => {
      const { schema, setSchema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const ruleIdx = rules.findIndex((r) => r.id === ruleId);
      if (ruleIdx === -1) return;
      const target = rules[ruleIdx];
      const actions = target.actions ? [...target.actions] : [];
      const actionIdx = actions.findIndex((a) => a.id === actionId);
      if (actionIdx === -1) return;
      actions.splice(actionIdx, 1);
      const newRules = [...rules];
      newRules[ruleIdx] = { ...target, actions } as Rule;
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      setSchema(newSchema);
    },
  };
}
