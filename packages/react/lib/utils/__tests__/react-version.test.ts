import { describe, expect, it } from 'vitest';
import { isReact19OrHigher } from '../react-version';

describe('isReact19OrHigher', () => {
  it('should be a function', () => {
    expect(typeof isReact19OrHigher).toBe('function');
  });

  it('should return a boolean', () => {
    const result = isReact19OrHigher();
    expect(typeof result).toBe('boolean');
  });
});
