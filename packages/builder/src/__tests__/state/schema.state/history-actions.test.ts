import { useSchemaStore } from '../../../lib/state/schema.state';
import { createSchema, makePage, resetStore } from './_helpers';

describe('schema.state history-actions', () => {
  beforeEach(() => resetStore());

  test('addHistory debounces and keeps only last schema', () => {
    jest.useFakeTimers();

    const p1 = makePage('p1', 'P1');
    const p2 = makePage('p2', 'P2');
    const s1 = createSchema([p1]);
    const s2 = createSchema([p2]);

    // start with one baseline history via setSchema
    useSchemaStore.getState().setSchema(s1);
    const baseLen = useSchemaStore.getState().histories.length;

    // two rapid calls, only last should persist after debounce
    useSchemaStore.getState().addHistory(s1); // will be skipped (same)
    useSchemaStore.getState().addHistory(s2);
    jest.advanceTimersByTime(300);

    const st = useSchemaStore.getState();
    expect(st.histories.length).toBe(baseLen + 1); // only one extra
    expect(st.histories.at(-1)).toBe(JSON.stringify(s2));

    jest.useRealTimers();
  });

  test('addHistory (skipDebounce) pushes and trims by max', () => {
    const p1 = makePage('p1');
    const p2 = makePage('p2');
    const p3 = makePage('p3');

    const s1 = createSchema([p1]);
    const s2 = createSchema([p2]);
    const s3 = createSchema([p3]);

    useSchemaStore.getState().setSchema(s1);
    useSchemaStore.getState().setMaxHistories(2);

    useSchemaStore.getState().addHistory(s2, true);
    useSchemaStore.getState().addHistory(s3, true);

    const st = useSchemaStore.getState();
    expect(st.histories.length).toBe(2);
    expect(st.histories[0]).toBe(JSON.stringify(s2)); // trimmed oldest (s1)
    expect(st.currentHistoryIndex).toBe(1);
  });

  test('undo and redo update schema/maps', () => {
    const p1 = makePage('p1');
    const p2 = makePage('p2');
    const s1 = createSchema([p1]);
    const s2 = createSchema([p2]);

    useSchemaStore.getState().setSchema(s1);
    useSchemaStore.getState().setSchema(s2);

    const beforeUndo = useSchemaStore.getState().schema;
    expect(beforeUndo?.form.fields[0].sys.id).toBe('p2');

    useSchemaStore.getState().undo();
    const afterUndo = useSchemaStore.getState().schema;
    expect(afterUndo?.form.fields[0].sys.id).toBe('p1');

    useSchemaStore.getState().redo();
    const afterRedo = useSchemaStore.getState().schema;
    expect(afterRedo?.form.fields[0].sys.id).toBe('p2');
  });

  test('clearHistories resets to single current entry', () => {
    const p1 = makePage('p1');
    const p2 = makePage('p2');
    const s1 = createSchema([p1]);
    const s2 = createSchema([p2]);

    useSchemaStore.getState().setSchema(s1);
    useSchemaStore.getState().setSchema(s2);

    useSchemaStore.getState().clearHistories();

    const st = useSchemaStore.getState();
    expect(st.histories.length).toBe(1);
    expect(st.currentHistoryIndex).toBe(0);
  });

  test('canUndo and canRedo reflect positions', () => {
    const p1 = makePage('p1');
    const p2 = makePage('p2');
    const s1 = createSchema([p1]);
    const s2 = createSchema([p2]);

    useSchemaStore.getState().setSchema(s1);
    expect(useSchemaStore.getState().canUndo()).toBe(false);
    expect(useSchemaStore.getState().canRedo()).toBe(false);

    useSchemaStore.getState().setSchema(s2);
    expect(useSchemaStore.getState().canUndo()).toBe(true);

    useSchemaStore.getState().undo();
    expect(useSchemaStore.getState().canRedo()).toBe(true);
  });
});
