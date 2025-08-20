import { FieldType, type FormField, PropertyType } from '@efie-form/core';
import {
  addFieldToTree,
  clearAllDebounceTimers,
  debounce,
  deepClone,
  findFieldInTree,
  generateId,
  getFieldInfoMap,
  moveFieldInTree,
  removeFieldFromTree,
  updateFieldInMaps,
} from '../../../lib/state/schema.state';

// helper to make a simple schema
const makePage = (id: string, name = 'Page'): FormField => ({
  id,
  type: FieldType.PAGE,
  children: [],
  props: [{ type: PropertyType.NAME, value: name }],
});

const makeShort = (id: string, label = 'Short', name = 'short'): FormField => ({
  id,
  type: FieldType.SHORT_TEXT,
  form: { name },
  props: [{ type: PropertyType.LABEL, value: label }],
});

describe('schema.state utils', () => {
  afterEach(() => {
    clearAllDebounceTimers();
  });

  test('generateId returns a 10-char base36 string', () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]{10}$/);
    expect(generateId()).not.toEqual(id); // likely unique
  });

  test('deepClone clones deeply', () => {
    const original = { a: 1, b: { c: 2 } };
    const clone = deepClone(original);
    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
    // mutate clone doesn't affect original
    (clone as any).b.c = 3;
    expect(original.b.c).toBe(2);
  });

  test('getFieldInfoMap builds maps incl. children', () => {
    const page = makePage('p1');
    const s1 = makeShort('s1');
    (page as any).children = [s1];
    const { fieldMap, fieldParentMap } = getFieldInfoMap([page]);

    expect(fieldMap.get('p1')).toBe(page);
    expect(fieldMap.get('s1')).toBe(s1);
    expect(fieldParentMap.get('s1')).toBe('p1');
  });

  test('updateFieldInMaps updates only target id', () => {
    const page = makePage('p1');
    const maps = getFieldInfoMap([page]);
    const updated = { ...page } as FormField;
    const newMaps = updateFieldInMaps('p1', updated, maps);

    expect(newMaps.fieldMap.get('p1')).toBe(updated);
  });

  test('findFieldInTree applies callback and returns new tree when updated', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];

    const out = findFieldInTree(
      [p1],
      's1',
      (field: FormField) => ({ ...field, id: 's1x' }) as FormField,
    );
    const child = (out[0] as any).children[0] as FormField;
    expect(child.id).toBe('s1x');
  });

  test('removeFieldFromTree removes nested node', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];

    const out = removeFieldFromTree([p1], 's1');
    expect((out[0] as any).children.length).toBe(0);
  });

  test('addFieldToTree at root and to parent by index', () => {
    const p1 = makePage('p1');
    const p2 = makePage('p2');

    const rootAdded = addFieldToTree([p1], p2);
    expect(rootAdded.map((f: FormField) => f.id)).toEqual(['p1', 'p2']);

    const s1 = makeShort('s1');
    const withChild = addFieldToTree([p1], s1, 'p1', 0);
    expect(((withChild[0] as any).children[0] as FormField).id).toBe('s1');
  });

  test('moveFieldInTree removes first and inserts under new parent', () => {
    const p1 = makePage('p1');
    const s1 = makeShort('s1');
    (p1 as any).children = [s1];

    const p2 = makePage('p2');

    const out = moveFieldInTree([p1, p2], 's1', 'p2', 0, s1);
    expect(((out[1] as any).children[0] as FormField).id).toBe('s1');
    expect(((out[0] as any).children as any[]).length).toBe(0);
  });

  test('debounce delays function and coalesces by key', async () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    debounce(fn, 100, 'k');
    debounce(fn, 100, 'k'); // should reset timer

    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
