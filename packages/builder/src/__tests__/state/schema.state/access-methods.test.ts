import { FieldType, type FormField } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { initSchema, makePage, makeShort, resetStore } from './_helpers';

describe('schema.state access-methods', () => {
  beforeEach(() => resetStore());

  test('getFieldById returns field', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];
    initSchema([p1]);

    expect(useSchemaStore.getState().getFieldById('s1')).toEqual(s1);
    expect(useSchemaStore.getState().getFieldById('zzz')).toBeUndefined();
  });

  test('getFieldParentId returns parent id', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];
    initSchema([p1]);

    expect(useSchemaStore.getState().getFieldParentId('s1')).toBe('p1');
    expect(useSchemaStore.getState().getFieldParentId('nope')).toBeUndefined();
  });

  test('listChildrenId returns nested ids', () => {
    const p1 = makePage('p1');
    const g1: FormField = {
      sys: {
        id: 'g1',
        name: 'g1',
        type: FieldType.GROUP,
      },
      children: [],
      props: [],
    };
    const s1 = makeShort('s1');
    const s2 = makeShort('s2');
    (g1 as any).children = [s1, s2];
    (p1 as any).children = [g1];
    initSchema([p1]);

    expect(useSchemaStore.getState().listChildrenId('p1')).toEqual(['g1', 's1', 's2']);
    expect(useSchemaStore.getState().listChildrenId('g1')).toEqual(['s1', 's2']);
  });
});
