import type { FormSchema } from '@efie-form/core';
import type { StateSetters } from './types';
import { debounce, getFieldInfoMap } from './utils';

export interface SchemaStateHistory {
  // History management (optimized)
  maxHistories: number;
  setMaxHistories: (maxHistories: number) => void;
  histories: string[];
  addHistory: (schema: FormSchema, skipDebounce?: boolean) => void;
  undo: () => void;
  redo: () => void;
  clearHistories: () => void;
  totalHistories: number;
  currentHistoryIndex: number;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export function createHistoryActions({ set, getState }: StateSetters): SchemaStateHistory {
  return {
    histories: [],
    totalHistories: 1,
    currentHistoryIndex: 0,

    // History management
    maxHistories: 50,
    setMaxHistories: (maxHistories) => {
      const { histories, currentHistoryIndex } = getState();

      // If new limit is smaller than current histories, trim them
      if (histories.length > maxHistories) {
        const startIndex = Math.max(0, histories.length - maxHistories);
        const newHistories = histories.slice(startIndex);
        const newCurrentIndex = Math.max(0, currentHistoryIndex - startIndex);

        set({
          maxHistories,
          histories: newHistories,
          totalHistories: newHistories.length,
          currentHistoryIndex: newCurrentIndex,
        });
      } else {
        set({ maxHistories });
      }
    },

    addHistory: (schema, skipDebounce) => {
      // Get state at the time of call to ensure we have the latest values
      const currentState = getState();
      const { maxHistories, histories, currentHistoryIndex } = currentState;

      const addToHistory = () => {
        // Create a deterministic JSON string
        const stringifiedSchema = JSON.stringify(schema);

        // Get the current history slice (up to current index)
        let newHistories = histories.slice(0, currentHistoryIndex + 1);

        // Skip if the schema hasn't actually changed (optimization)
        if (newHistories.length > 0) {
          const lastHistory = newHistories.at(-1);
          if (lastHistory === stringifiedSchema) {
            return; // No changes, skip adding to history
          }
        }

        // Add the new history entry
        newHistories.push(stringifiedSchema);

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
      } else {
        // Use shorter debounce for better user experience (100ms instead of 250ms)
        debounce(addToHistory, 250, 'addHistory');
      }
    },

    undo: () => {
      const { histories, currentHistoryIndex } = getState();
      const previousHistoryIndex = currentHistoryIndex - 1;
      if (previousHistoryIndex < 0) return;
      const previousHistory = histories[previousHistoryIndex];
      const newSchema = JSON.parse(previousHistory);

      const { fieldMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);

      set({
        fieldMap,
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

      const { fieldMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);

      set({
        fieldMap,
        fieldParentMap,
        schema: newSchema,
        currentHistoryIndex: nextHistoryIndex,
      });
    },

    clearHistories: () => {
      const { schema } = getState();
      const currentHistory = JSON.stringify(schema);
      set({
        histories: [currentHistory],
        totalHistories: 1,
        currentHistoryIndex: 0,
      });
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
