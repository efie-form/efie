import type { Action, FormSchema, Rule, RuleBranch } from '@efie-form/core';
import type { StateSetters } from './types';
import { deepClone, generateId } from './utils';

export interface SchemaStateRuleActions {
  getAllRules: () => Rule[];
  findRuleById: (ruleId?: string) => Rule | undefined;
  addRule: (rule: Rule, index?: number) => void;
  removeRule: (ruleId: string) => void;
  moveRule: (from: number, to: number) => void;
  updateRule: (ruleId: string, patch: Partial<Rule>) => void;
  addRuleBranch: (ruleId: string, branch: RuleBranch, index?: number) => void;
  updateRuleBranch: (ruleId: string, branchIndex: number, patch: Partial<RuleBranch>) => void;
  removeRuleBranch: (ruleId: string, branchIndex: number) => void;
  setRuleElseActions: (ruleId: string, actions: Action[]) => void;
  clearRuleElseActions: (ruleId: string) => void;
}

export function createRuleActions({ getState, set }: StateSetters): SchemaStateRuleActions {
  const commit = (newSchema: FormSchema) => {
    const { maxHistories, histories, currentHistoryIndex } = getState();
    const stringifiedSchema = JSON.stringify(newSchema);

    let newHistories = histories.slice(0, currentHistoryIndex + 1);
    if (newHistories.length === 0 || newHistories.at(-1) !== stringifiedSchema) {
      newHistories.push(stringifiedSchema);
      if (newHistories.length > maxHistories) {
        newHistories = newHistories.slice(newHistories.length - maxHistories);
      }
    }

    set({
      schema: newSchema,
      histories: newHistories,
      totalHistories: newHistories.length,
      currentHistoryIndex: newHistories.length - 1,
    });
  };

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
      const { schema } = getState();
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

      commit(newSchema);
    },

    removeRule: (ruleId) => {
      const { schema } = getState();
      if (!schema || !schema.form.rules?.length) return;
      const newRules = schema.form.rules.filter((r) => r.id !== ruleId);
      if (newRules.length === schema.form.rules.length) return; // no-op

      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      commit(newSchema);
    },

    moveRule: (from, to) => {
      const { schema } = getState();
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
      commit(newSchema);
    },

    updateRule: (ruleId, patch) => {
      const { schema } = getState();
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
      commit(newSchema);
    },

    addRuleBranch: (ruleId, branch, index) => {
      const { schema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const idx = rules.findIndex((r) => r.id === ruleId);
      if (idx === -1) return;
      const target = rules[idx];
      const branches = target.branches ? [...target.branches] : [];
      const newBranch = deepClone(branch);
      if (index !== undefined && index >= 0 && index <= branches.length) {
        branches.splice(index, 0, newBranch);
      } else {
        branches.push(newBranch);
      }
      const newRules = [...rules];
      newRules[idx] = { ...target, branches };
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      commit(newSchema);
    },

    updateRuleBranch: (ruleId, branchIndex, patch) => {
      const { schema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const idx = rules.findIndex((r) => r.id === ruleId);
      if (idx === -1) return;
      const target = rules[idx];
      if (!target.branches || branchIndex < 0 || branchIndex >= target.branches.length) return;
      const branches = [...target.branches];
      branches[branchIndex] = { ...branches[branchIndex], ...patch } as RuleBranch;
      const newRules = [...rules];
      newRules[idx] = { ...target, branches };
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      commit(newSchema);
    },

    removeRuleBranch: (ruleId, branchIndex) => {
      const { schema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const idx = rules.findIndex((r) => r.id === ruleId);
      if (idx === -1) return;
      const target = rules[idx];
      const branches = target.branches ? [...target.branches] : [];
      if (branchIndex < 0 || branchIndex >= branches.length) return;
      branches.splice(branchIndex, 1);
      const newRules = [...rules];
      newRules[idx] = { ...target, branches };
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      commit(newSchema);
    },

    setRuleElseActions: (ruleId, actions) => {
      const { schema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const idx = rules.findIndex((r) => r.id === ruleId);
      if (idx === -1) return;
      const target = rules[idx];
      const newRules = [...rules];
      newRules[idx] = { ...target, elseActions: deepClone(actions) };
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      commit(newSchema);
    },

    clearRuleElseActions: (ruleId) => {
      const { schema } = getState();
      if (!schema) return;
      const rules = schema.form.rules ?? [];
      const idx = rules.findIndex((r) => r.id === ruleId);
      if (idx === -1) return;
      const target = rules[idx];
      const newRules = [...rules];
      const { ...rest } = target;
      (rest as Rule).elseActions = undefined;
      newRules[idx] = { ...(rest as Rule) } as Rule;
      const newSchema: FormSchema = {
        ...schema,
        form: { ...schema.form, rules: newRules },
      };
      commit(newSchema);
    },
  };
}
