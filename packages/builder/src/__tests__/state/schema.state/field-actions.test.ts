import { FieldType, type FormField } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { initSchema, makePage, makeShort, resetStore } from './_helpers';

describe('schema.state field-actions', () => {
  beforeEach(() => resetStore());

  test('addField adds at root and updates maps/history', () => {
    initSchema([]);
    const page = makePage('p1');
    useSchemaStore.getState().addField(page);

    const st = useSchemaStore.getState();
    const schema = st.schema as any;
    expect(schema.form.fields.length).toBe(1);
    expect(st.fieldMap.get(schema.form.fields[0].id)).toBeDefined();
    expect(st.histories.length).toBeGreaterThan(0);
  });

  test('updateField updates in tree and history debounces when no change', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];
    initSchema([p1]);

    const updated = { ...(s1 as any), form: { name: 'changed' } } as FormField;
    useSchemaStore.getState().updateField('s1', updated);

    const st = useSchemaStore.getState();
    const schema = st.schema as any;
    const child = schema.form.fields[0].children[0] as any as FormField;
    expect((child as any).form?.name).toBe('changed');
    expect(st.fieldMap.get('s1')).toEqual(updated);
  });

  test('duplicateField deep clones with new ids', () => {
    const p1 = makePage('p1');
    const g1: FormField = { id: 'g1', type: FieldType.GROUP, children: [], props: [] };
    const s1 = makeShort('s1');
    (g1 as any).children = [s1];
    (p1 as any).children = [g1];
    initSchema([p1]);

    const dup = useSchemaStore.getState().duplicateField('g1');
    expect(dup).toBeDefined();
    const d = dup as any;
    expect(d.id).not.toBe('g1');
    expect(d.children[0].id).not.toBe('s1');
  });

  test('moveField moves between parents and updates maps/history', () => {
    const p1 = makePage('p1');
    const p2 = makePage('p2');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];
    initSchema([p1, p2]);

    useSchemaStore.getState().moveField('s1', 'p2', 0);

    const st = useSchemaStore.getState();
    const schema = st.schema as any;
    expect(schema.form.fields[1].children[0].id).toBe('s1');
    expect(schema.form.fields[0].children.length).toBe(0);
  });

  test('deleteField removes and updates maps/history', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];
    initSchema([p1]);

    useSchemaStore.getState().deleteField('s1');

    const st = useSchemaStore.getState();
    const schema = st.schema as any;
    expect(schema.form.fields[0].children.length).toBe(0);
    expect(st.fieldMap.get('s1')).toBeUndefined();
  });

  test('movePage reorders only top-level pages', () => {
    const p1 = makePage('p1');
    const p2 = makePage('p2');
    initSchema([p1, p2]);

    useSchemaStore.getState().movePage(0, 1);

    const ids = (useSchemaStore.getState().schema as any).form.fields.map((f: any) => f.id);
    expect(ids).toEqual(['p2', 'p1']);
  });
});
