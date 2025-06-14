import { FormFieldType, getColorObject, PropertyType } from '@efie-form/core';
import type { FormField } from '@efie-form/core';
import { createTestStore } from './test-utils';

describe('History Actions', () => {
  let useStore: ReturnType<typeof createTestStore>;
  let store: ReturnType<typeof useStore.getState>;

  beforeEach(() => {
    // Create a fresh store for each test
    useStore = createTestStore();
    store = useStore.getState();
  });

  describe('History Management', () => {
    it('should initialize with one history entry', () => {
      expect(store.histories).toHaveLength(1);
      expect(store.currentHistoryIndex).toBe(0);
      expect(store.totalHistories).toBe(1);
    });

    it('should add history when making changes', () => {
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.SHORT_TEXT,
        form: {
          key: 'test-field',
        },
        props: [],
      };

      const initialHistoryLength = store.histories.length;
      store.addField(newField, 'block-1');

      // Get updated state after the change
      const updatedStore = useStore.getState();
      expect(updatedStore.histories.length).toBeGreaterThan(initialHistoryLength);
      expect(updatedStore.currentHistoryIndex).toBe(updatedStore.histories.length - 1);
    });

    it('should support undo operation', () => {
      // Make a change
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.SHORT_TEXT,
        form: {
          key: 'test-field-2',
        },
        props: [],
      };

      store.addField(newField, 'block-1');

      // Verify field was added
      const blockField = store.getFieldById('block-1');
      expect('children' in blockField! && blockField.children).toHaveLength(1);

      // Undo the change
      store.undo();

      // Verify field was removed
      const undoneBlockField = store.getFieldById('block-1');
      expect('children' in undoneBlockField! && undoneBlockField.children).toHaveLength(0);
    });

    it('should support redo operation', () => {
      // Make a change
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.SHORT_TEXT,
        form: {
          key: 'test-field-3',
        },
        props: [],
      };

      store.addField(newField, 'block-1');

      // Undo the change
      store.undo();

      // Verify field was removed
      const undoneBlockField = store.getFieldById('block-1');
      expect('children' in undoneBlockField! && undoneBlockField.children).toHaveLength(0);

      // Redo the change
      store.redo();

      // Verify field was added back
      const redoneBlockField = store.getFieldById('block-1');
      expect('children' in redoneBlockField! && redoneBlockField.children).toHaveLength(1);
    });

    it('should correctly report canUndo status', () => {
      expect(store.canUndo()).toBe(false); // Initial state, nothing to undo

      // Make a change
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.SHORT_TEXT,
        form: {
          key: 'test-field-4',
        },
        props: [],
      };

      store.addField(newField, 'block-1');
      expect(store.canUndo()).toBe(true);

      // Undo
      store.undo();
      expect(store.canUndo()).toBe(false);
    });

    it('should correctly report canRedo status', () => {
      expect(store.canRedo()).toBe(false); // Initial state, nothing to redo

      // Make a change
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.SHORT_TEXT,
        form: {
          key: 'test-field-5',
        },
        props: [],
      };

      store.addField(newField, 'block-1');
      expect(store.canRedo()).toBe(false); // At latest state

      // Undo
      store.undo();
      expect(store.canRedo()).toBe(true);

      // Redo
      store.redo();
      expect(store.canRedo()).toBe(false);
    });

    it('should clear all histories', () => {
      // Make some changes to create history
      const newField: FormField = {
        id: 'temp-id',
        type: FormFieldType.SHORT_TEXT,
        form: {
          key: 'test-field-6',
        },
        props: [],
      };

      store.addField(newField, 'block-1');
      store.updateField('block-1', { props: [{ type: PropertyType.BACKGROUND_COLOR, value: getColorObject('#FF0000') }] });

      // Get updated state after changes
      let updatedStore = useStore.getState();
      expect(updatedStore.histories.length).toBeGreaterThan(1);

      store.clearHistories();

      // Get updated state after clearing
      updatedStore = useStore.getState();
      expect(updatedStore.histories).toHaveLength(1);
      expect(updatedStore.currentHistoryIndex).toBe(0);
      expect(updatedStore.totalHistories).toBe(1);
    });

    it('should respect maximum history limit', () => {
      const originalMaxHistories = store.maxHistories;

      // Set a small limit for testing
      store.setMaxHistories(3);

      // Get updated state after setting max histories
      let updatedStore = useStore.getState();
      expect(updatedStore.maxHistories).toBe(3);

      // Make multiple changes
      for (let i = 0; i < 5; i++) {
        store.updateField('block-1', {
          props: [{ type: PropertyType.BACKGROUND_COLOR, value: getColorObject(`#FF0000${i}`) }],
        });
      }

      // Get updated state after changes
      updatedStore = useStore.getState();
      // Should not exceed max histories
      expect(updatedStore.histories.length).toBeLessThanOrEqual(3);

      // Restore original limit
      store.setMaxHistories(originalMaxHistories);
    });
  });

  describe('History Edge Cases', () => {
    it('should not undo beyond the first history entry', () => {
      const initialHistoryLength = store.histories.length;

      // Try to undo when already at the beginning
      store.undo();

      expect(store.currentHistoryIndex).toBe(0);
      expect(store.histories).toHaveLength(initialHistoryLength);
    });

    it('should not redo beyond the last history entry', () => {
      // Try to redo when already at the latest state
      store.redo();

      expect(store.currentHistoryIndex).toBe(store.histories.length - 1);
    });

    it('should truncate future history when making changes after undo', () => {
      // Make some changes
      const newField1: FormField = {
        id: 'temp-id-1',
        type: FormFieldType.SHORT_TEXT,
        form: {
          key: 'test-field-7',
        },
        props: [],
      };

      const newField2: FormField = {
        id: 'temp-id-2',
        type: FormFieldType.LONG_TEXT,
        form: {
          key: 'test-field-8',
        },
        props: [],
      };

      store.addField(newField1, 'block-1');
      store.addField(newField2, 'block-1');

      // Get updated state after changes
      let updatedStore = useStore.getState();
      const historyLengthAfterChanges = updatedStore.histories.length;

      // Undo once
      store.undo();

      // Make a new change (should truncate future history)
      const newField3: FormField = {
        id: 'temp-id-3',
        type: FormFieldType.NUMBER,
        form: {
          key: 'test-field-9',
        },
        props: [],
      };

      store.addField(newField3, 'block-1');

      // Get updated state after final change
      updatedStore = useStore.getState();
      // History should be the same length or shorter (future history was truncated)
      expect(updatedStore.histories.length).toBeLessThanOrEqual(historyLengthAfterChanges);
      expect(updatedStore.canRedo()).toBe(false);
    });
  });
});
