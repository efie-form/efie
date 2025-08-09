import { type PropertyDefinition, PropertyType } from '@efie-form/core';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { initSchema, makePage, makeShort, resetStore } from './_helpers';

describe('schema.state property-actions', () => {
  beforeEach(() => resetStore());

  test('updateFieldProperty inserts or replaces property', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];
    initSchema([p1]);

    const label: PropertyDefinition = { type: PropertyType.LABEL, value: 'New Label' } as any;
    useSchemaStore.getState().updateFieldProperty('s1', label);

    const after1 = useSchemaStore.getState().getFieldProperty('s1', PropertyType.LABEL);
    expect(after1).toBeDefined();

    const label2: PropertyDefinition = { type: PropertyType.LABEL, value: 'Label 2' } as any;
    useSchemaStore.getState().updateFieldProperty('s1', label2);

    const after2 = useSchemaStore.getState().getFieldProperty('s1', PropertyType.LABEL) as any;
    expect(after2.value).toBe('Label 2');
  });

  test('getFieldProperty returns by type', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (s1 as any).props.push({ type: PropertyType.PLACEHOLDER, value: 'ph' });
    (p1 as any).children = [s1];
    initSchema([p1]);

    const prop = useSchemaStore.getState().getFieldProperty('s1', PropertyType.PLACEHOLDER) as any;
    expect(prop.value).toBe('ph');
  });

  test('findFieldCustomProperty and updateFieldCustomProperty', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (s1 as any).props.push({ id: 'c1', type: PropertyType.CUSTOM, dataType: 'text', value: 'x' });
    (p1 as any).children = [s1];
    initSchema([p1]);

    const found = useSchemaStore.getState().findFieldCustomProperty('s1', 'c1');
    expect(found?.id).toBe('c1');

    useSchemaStore.getState().updateFieldCustomProperty('s1', 'c1', {
      id: 'c1',
      type: PropertyType.CUSTOM,
      dataType: 'text',
      value: 'y',
    } as any);

    const after = useSchemaStore.getState().findFieldCustomProperty('s1', 'c1') as any;
    expect(after.value).toBe('y');
  });
});
