import type { FormSchema } from '@efie-form/core';
import type { StateSetters } from './types';
import { debounce, getFieldInfoMap } from './utils';

export function createHistoryActions({ set, getState }: StateSetters) {
  return {
    // History management
    maxHistories: 50,
    setMaxHistories: (maxHistories: number) => {
      set({ maxHistories });
    },

    addHistory: (schema: FormSchema) => {
      const { maxHistories, histories, currentHistoryIndex } = getState();
      debounce(() => {
        const stringifiedSchema = JSON.stringify(schema);

        let newHistories = histories.slice(0, currentHistoryIndex + 1);
        newHistories.push(stringifiedSchema);

        if (newHistories.length > maxHistories) {
          newHistories = newHistories.slice(newHistories.length - maxHistories);
        }

        set({
          histories: newHistories,
          totalHistories: newHistories.length,
          currentHistoryIndex: newHistories.length - 1,
        });
      }, 250);
    },

    undo: () => {
      const { histories, currentHistoryIndex } = getState();
      const previousHistoryIndex = currentHistoryIndex - 1;
      if (previousHistoryIndex < 0) return;
      const previousHistory = histories[previousHistoryIndex];
      const newSchema = JSON.parse(previousHistory);

      const { fieldMap, fieldKeyMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);

      set({
        fieldMap,
        fieldKeyMap,
        fieldParentMap,
        schema: newSchema,
        currentHistoryIndex: previousHistoryIndex,
      });
    },

    redo: () => {
      const { histories, currentHistoryIndex } = getState();
      const nextHistoryIndex = currentHistoryIndex + 1;
      if (nextHistoryIndex >= histories.length) return;
      const nextHistory = histories[nextHistoryIndex];
      const newSchema = JSON.parse(nextHistory);

      const { fieldMap, fieldKeyMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);

      set({
        fieldMap,
        fieldKeyMap,
        fieldParentMap,
        schema: newSchema,
        currentHistoryIndex: nextHistoryIndex,
      });
    },

    clearHistories: () => {
      set({ histories: [], totalHistories: 0, currentHistoryIndex: 0 });
    },

    canUndo: () => {
      const { currentHistoryIndex } = getState();
      return currentHistoryIndex > 0;
    },

    canRedo: () => {
      const { currentHistoryIndex, totalHistories } = getState();
      return currentHistoryIndex < totalHistories - 1;
    },
  };
}
