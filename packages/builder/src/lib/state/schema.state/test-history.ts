// Test file to debug history issues
import { useSchemaStore } from './schema.state';

export function testHistoryFunctionality() {
  console.log('=== Testing History Functionality ===');

  const store = useSchemaStore.getState();

  console.log('BEFORE: histories =', store.totalHistories, 'fields =', store.schema.form.fields.length, 'canUndo =', store.canUndo());

  // Test adding a field
  const testField = {
    id: 'test-field-' + Date.now(),
    type: 'short-text' as const,
    props: [],
  };

  store.addField(testField);

  // Check state immediately
  const newState = useSchemaStore.getState();
  console.log('AFTER: histories =', newState.totalHistories, 'fields =', newState.schema.form.fields.length, 'canUndo =', newState.canUndo());

  if (newState.canUndo()) {
    console.log('SUCCESS: Can undo after adding field!');

    // Test undo
    newState.undo();
    const undoState = useSchemaStore.getState();
    console.log('AFTER UNDO: histories =', undoState.totalHistories, 'fields =', undoState.schema.form.fields.length, 'canRedo =', undoState.canRedo());
  }
  else {
    console.log('ERROR: Cannot undo after adding field!');
  }
}

// Simple test that can be called from browser console
export function quickTest() {
  const store = useSchemaStore.getState();
  console.log('Before:', store.totalHistories, 'histories,', store.schema.form.fields.length, 'fields');

  store.addField({ id: 'test', type: 'short-text' as const, props: [] });

  const after = useSchemaStore.getState();
  console.log('After:', after.totalHistories, 'histories,', after.schema.form.fields.length, 'fields, canUndo:', after.canUndo());
}

// Export for use in development
if (globalThis.window !== undefined) {
  (globalThis as any).testHistoryFunctionality = testHistoryFunctionality;
}
