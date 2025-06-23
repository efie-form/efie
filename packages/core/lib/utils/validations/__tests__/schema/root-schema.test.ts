import validateSchema from '../../index';
import { createValidSchema } from '../helpers/test-helpers';

describe('validateSchema - Root schema validation', () => {
  it('should return true for valid schema', () => {
    const validSchema = createValidSchema();
    expect(validateSchema(validSchema)).toBe(true);
  });

  it('should return false for non-object values', () => {
    expect(validateSchema()).toBe(false);
    expect(validateSchema('string')).toBe(false);
    expect(validateSchema(123)).toBe(false);
    expect(validateSchema([])).toBe(false);
    expect(validateSchema(true)).toBe(false);
  });

  it('should return false for objects missing required root keys', () => {
    expect(validateSchema({})).toBe(false);
    expect(validateSchema({ version: 'v1' })).toBe(false);
    expect(validateSchema({ form: {} })).toBe(false);
  });

  it('should return false for invalid version format', () => {
    const schema = createValidSchema();

    // Non-string version
    expect(validateSchema({ ...schema, version: 1 })).toBe(false);

    // Invalid version format
    expect(validateSchema({ ...schema, version: 'v' })).toBe(false);
    expect(validateSchema({ ...schema, version: '1' })).toBe(false);
    expect(validateSchema({ ...schema, version: 'version1' })).toBe(false);
    expect(validateSchema({ ...schema, version: 'v1.0' })).toBe(false);
  });

  it('should return true for valid version formats', () => {
    const schema = createValidSchema();

    expect(validateSchema({ ...schema, version: 'v1' })).toBe(true);
    expect(validateSchema({ ...schema, version: 'v2' })).toBe(true);
    expect(validateSchema({ ...schema, version: 'v123' })).toBe(true);
  });

  it('should return false for non-object form property', () => {
    const schema = createValidSchema();

    expect(validateSchema({ ...schema, form: 'string' })).toBe(false);
    expect(validateSchema({ ...schema, form: 123 })).toBe(false);
    expect(validateSchema({ ...schema, form: [] })).toBe(false);
  });
});
