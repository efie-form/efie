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

    addHistory: (schema: FormSchema, skipDebounce?: boolean) => {
      // Get state at the time of call to ensure we have the latest values
      const currentState = getState();
      const { maxHistories, histories, currentHistoryIndex, enableOptimizations } = currentState;

      const addToHistory = () => {
        // Create a deterministic JSON string
        const stringifiedSchema = JSON.stringify(schema);

        // Get the current history slice (up to current index)
        let newHistories = histories.slice(0, currentHistoryIndex + 1);

        console.log('addToHistory: field count =', schema.form.fields.length, 'histories =', newHistories.length);

        // For debugging, temporarily disable optimization
        if (enableOptimizations && newHistories.length > 0) {
          const lastHistory = newHistories.at(-1);
          if (lastHistory === stringifiedSchema) {
            console.log('Skipping duplicate history');
            return;
          }
        }

        // Add the new history entry
        newHistories.push(stringifiedSchema);
        console.log('Added history entry. New total:', newHistories.length);

        // Trim if exceeding max histories
        if (newHistories.length > maxHistories) {
          newHistories = newHistories.slice(newHistories.length - maxHistories);
        }

        set({
          histories: newHistories,
          totalHistories: newHistories.length,
          currentHistoryIndex: newHistories.length - 1,
        });
      };

      if (skipDebounce) {
        addToHistory();
      }
      else {
        // Use shorter debounce for better user experience (100ms instead of 250ms)
        debounce(addToHistory, 100, 'addHistory');
      }
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
