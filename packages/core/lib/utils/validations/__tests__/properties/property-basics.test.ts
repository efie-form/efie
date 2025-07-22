import { FieldType } from '../../../../constants/field-type';
import { PropertyType } from '../../../../constants/form-schema.constant';
import type { FormField } from '../../../../types/form-field.type';
import validateSchema from '../../index';
import { createValidField, createValidSchema } from '../helpers/test-helpers';

describe('validateSchema - Property validation basics', () => {
  it('should return false for invalid property definitions', () => {
    const schema = createValidSchema();

    // Non-object property
    const field = createValidField(FieldType.SHORT_TEXT);
    field.props = ['invalid'] as unknown as typeof field.props;
    schema.form.fields = [field];
    expect(validateSchema(schema)).toBe(false);

    // Missing type
    field.props = [{ value: 'test' }] as unknown as typeof field.props;
    expect(validateSchema(schema)).toBe(false);

    // Missing value
    field.props = [{ type: PropertyType.LABEL }] as unknown as typeof field.props;
    expect(validateSchema(schema)).toBe(false);

    // Non-string type
    field.props = [{ type: 123, value: 'test' }] as unknown as typeof field.props;
    expect(validateSchema(schema)).toBe(false);
  });

  it('should handle empty property arrays', () => {
    const schema = createValidSchema();
    const field = {
      id: 'test',
      type: FieldType.SHORT_TEXT,
      props: [],
    } as unknown as FormField;
    schema.form.fields = [field];
    expect(validateSchema(schema)).toBe(true);
  });

  it('should handle fields with multiple property types', () => {
    const schema = createValidSchema();
    const field = createValidField(FieldType.SHORT_TEXT, [
      { type: PropertyType.PLACEHOLDER, value: 'Enter text' },
      { type: PropertyType.REQUIRED, value: true },
    ]);
    schema.form.fields = [field];
    expect(validateSchema(schema)).toBe(true);
  });
});
