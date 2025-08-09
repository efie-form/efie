import { useSchemaStore } from '../../../lib/state/schema.state';
import { initSchema, makePage, makeShort, resetStore } from './_helpers';

describe('schema.state form-data-actions', () => {
  beforeEach(() => resetStore());

  test('setFieldName and getFieldName', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1', 'Short', 'name1');
    (p1 as any).children = [s1];
    initSchema([p1]);

    expect(useSchemaStore.getState().getFieldName('s1')).toBe('name1');
    useSchemaStore.getState().setFieldName('s1', 'name2');
    expect(useSchemaStore.getState().getFieldName('s1')).toBe('name2');
  });
});
