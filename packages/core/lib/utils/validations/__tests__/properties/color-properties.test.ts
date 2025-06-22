import { FieldType } from '../../../../constants/field-type';
import { PropertyType } from '../../../../constants/form-schema.constant';
import validateSchema from '../../index';
import { createValidSchema, createValidField } from '../helpers/test-helpers';

describe('validateSchema - Color property types', () => {
  const colorProperties = [
    PropertyType.COLOR,
    PropertyType.BORDER_COLOR,
    PropertyType.BACKGROUND_COLOR,
  ];

  for (const propType of colorProperties) {
    it(`should validate ${propType} with valid hex color`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        { type: propType, value: { hex: '#FFFFFF' } },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it(`should validate ${propType} with valid RGBA color`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        { type: propType, value: { rgba: { r: 255, g: 255, b: 255, a: 1 } } },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it(`should validate ${propType} with valid HSLA color`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        { type: propType, value: { hsla: { h: 360, s: 100, l: 100, a: 1 } } },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it(`should reject ${propType} with invalid color values`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT);

      // Non-object value
      field.props = [{ type: propType, value: 'red' }] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      // Invalid hex
      field.props = [{ type: propType, value: { hex: 'invalid' } }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Invalid RGBA
      field.props = [{ type: propType, value: { rgba: { r: 256, g: 255, b: 255, a: 1 } } }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Invalid HSLA
      field.props = [{ type: propType, value: { hsla: { h: 361, s: 100, l: 100, a: 1 } } }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  }
});
