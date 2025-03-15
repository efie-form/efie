import { generateId } from './utils';

test('generate random string with given length', () => {
  const id = generateId(10);

  expect(id).toHaveLength(10);
});
