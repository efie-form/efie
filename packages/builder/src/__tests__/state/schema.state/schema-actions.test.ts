import { useSchemaStore } from '../../../lib/state/schema.state';
import { createSchema, initSchema, makePage, makeShort, resetStore } from './_helpers';

const read = () => useSchemaStore.getState();

describe('schema.state schema-actions', () => {
  beforeEach(() => resetStore());

  test('setSchema builds maps and adds history', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];
    const schema = createSchema([p1]);

    read().setSchema(schema);

    const st = read();
    expect(st.schema).toEqual(schema);
    expect(st.fieldMap.get('p1')).toBe(p1);
    expect(st.fieldParentMap.get('s1')).toBe('p1');
    expect(st.histories.length).toBeGreaterThan(0);
  });

  test('setFields replaces only fields and updates maps/history', () => {
    initSchema([]);
    const p1 = makePage('p1');
    const p2 = makePage('p2');
    read().setFields([p1, p2]);

    const st = read();
    expect(st.schema?.form.fields).toEqual([p1, p2]);
    expect(st.fieldMap.get('p2')).toBe(p2);
    expect(st.histories.length).toBeGreaterThan(0);
  });
});
