import { FieldType } from '../../../../constants/field-type';
import type { FormField } from '../../../../types/form-field.type';
import validateSchema from '../../index';
import { createValidSchema } from '../helpers/test-helpers';

describe('validateSchema - Fields validation', () => {
  it('should return false for non-array fields', () => {
    const schema = createValidSchema();

    expect(validateSchema({ ...schema, form: { fields: 'string', rules: [] } })).toBe(false);
    expect(validateSchema({ ...schema, form: { fields: {}, rules: [] } })).toBe(false);
    expect(validateSchema({ ...schema, form: { fields: 123, rules: [] } })).toBe(false);
  });

  it('should return true for empty fields array', () => {
    const schema = createValidSchema();
    expect(validateSchema(schema)).toBe(true);
  });

  it('should return false for invalid field in fields array', () => {
    const schema = createValidSchema();

    // Invalid field types
    schema.form.fields = ['string' as unknown as FormField];
    expect(validateSchema(schema)).toBe(false);

    schema.form.fields = [123 as unknown as FormField];
    expect(validateSchema(schema)).toBe(false);
  });
});

describe('validateSchema - Field validation', () => {
  it('should return false for fields missing required properties', () => {
    const schema = createValidSchema();

    // Missing id
    schema.form.fields = [{ type: FieldType.SHORT_TEXT, props: [] } as unknown as FormField];
    expect(validateSchema(schema)).toBe(false);

    // Missing type
    schema.form.fields = [{ id: 'test', props: [] } as unknown as FormField];
    expect(validateSchema(schema)).toBe(false);

    // Missing props
    schema.form.fields = [{ id: 'test', type: FieldType.SHORT_TEXT } as unknown as FormField];
    expect(validateSchema(schema)).toBe(false);
  });

  it('should return false for fields with invalid property types', () => {
    const schema = createValidSchema();

    // Non-string id
    schema.form.fields = [
      { id: 123, type: FieldType.SHORT_TEXT, props: [] } as unknown as FormField,
    ];
    expect(validateSchema(schema)).toBe(false);

    // Non-string type
    schema.form.fields = [{ id: 'test', type: 123, props: [] } as unknown as FormField];
    expect(validateSchema(schema)).toBe(false);

    // Non-array props
    schema.form.fields = [
      { id: 'test', type: FieldType.SHORT_TEXT, props: 'invalid' } as unknown as FormField,
    ];
    expect(validateSchema(schema)).toBe(false);
  });

  it('should return false for invalid field type', () => {
    const schema = createValidSchema();
    schema.form.fields = [{ id: 'test', type: 'invalid_type', props: [] } as unknown as FormField];
    expect(validateSchema(schema)).toBe(false);
  });

  it('should return false for invalid children array', () => {
    const schema = createValidSchema();

    // Non-array children
    schema.form.fields = [
      {
        id: 'test',
        type: FieldType.BLOCK,
        props: [],
        children: 'invalid',
      } as unknown as FormField,
    ];
    expect(validateSchema(schema)).toBe(false);
  });

  it('should return false for invalid child fields', () => {
    const schema = createValidSchema();

    schema.form.fields = [
      {
        id: 'test',
        type: FieldType.BLOCK,
        props: [],
        children: [{ invalid: 'child' }],
      } as unknown as FormField,
    ];
    expect(validateSchema(schema)).toBe(false);
  });
});
