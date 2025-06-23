import { FieldType } from '../../../../constants/field-type';
import { PropertyType } from '../../../../constants/form-schema.constant';
import validateSchema from '../../index';
import { createValidSchema, createValidField } from '../helpers/test-helpers';

describe('validateSchema - Number property types', () => {
  const numberProperties = [
    PropertyType.FONT_WEIGHT,
    PropertyType.MAX_FILES,
  ];

  for (const propType of numberProperties) {
    it(`should validate ${propType} with valid number value`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        { type: propType, value: 123 },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it(`should validate ${propType} with zero`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        { type: propType, value: 0 },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it(`should reject ${propType} with invalid values`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT);

      // Non-number values
      field.props = [{ type: propType, value: 'string' }] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      field.props = [{ type: propType, value: undefined }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  }
});

describe('validateSchema - Boolean property types', () => {
  it('should validate REQUIRED with valid boolean value', () => {
    const schema = createValidSchema();

    // Test true
    let field = createValidField(FieldType.SHORT_TEXT, [
      { type: PropertyType.REQUIRED, value: true },
    ]);
    schema.form.fields = [field];
    expect(validateSchema(schema)).toBe(true);

    // Test false
    field = createValidField(FieldType.SHORT_TEXT, [
      { type: PropertyType.REQUIRED, value: false },
    ]);
    schema.form.fields = [field];
    expect(validateSchema(schema)).toBe(true);
  });

  it('should reject REQUIRED with invalid values', () => {
    const schema = createValidSchema();
    const field = createValidField(FieldType.SHORT_TEXT);

    field.props = [{ type: PropertyType.REQUIRED, value: 'true' }] as unknown as typeof field.props;
    schema.form.fields = [field];
    expect(validateSchema(schema)).toBe(false);

    field.props = [{ type: PropertyType.REQUIRED, value: 1 }] as unknown as typeof field.props;
    expect(validateSchema(schema)).toBe(false);

    field.props = [{ type: PropertyType.REQUIRED, value: undefined }] as unknown as typeof field.props;
    expect(validateSchema(schema)).toBe(false);
  });
});
