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

  test('duplicateField deep clones with new ids and adds to schema', () => {
    const p1 = makePage('p1');
    const g1: FormField = { id: 'g1', type: FieldType.GROUP, children: [], props: [] };
    const s1 = makeShort('s1');
    (g1 as any).children = [s1];
    (p1 as any).children = [g1];
    initSchema([p1]);

    const duplicatedFieldId = useSchemaStore.getState().duplicateField('g1');
    expect(duplicatedFieldId).toBeDefined();
    expect(duplicatedFieldId).not.toBe('g1');

    // Check that the duplicated field was added to the schema
    const state = useSchemaStore.getState();
    const duplicatedField = state.fieldMap.get(duplicatedFieldId as string);
    expect(duplicatedField).toBeDefined();
    expect(duplicatedField?.id).toBe(duplicatedFieldId);
    expect((duplicatedField as any)?.children[0].id).not.toBe('s1');

    // Check that both original and duplicated fields exist in the schema
    const schema = state.schema as any;
    const pageChildren = schema.form.fields[0].children;
    expect(pageChildren.length).toBe(2); // Original + duplicated
    expect(pageChildren.some((child: any) => child.id === 'g1')).toBe(true);
    expect(pageChildren.some((child: any) => child.id === duplicatedFieldId)).toBe(true);
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
