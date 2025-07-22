import { FieldType } from '../../../../constants/field-type';
import { PropertyType } from '../../../../constants/form-schema.constant';
import validateSchema from '../../index';
import { createValidField, createValidSchema, createValidSize } from '../helpers/test-helpers';

describe('validateSchema - Size property types', () => {
  const sizeProperties = [
    PropertyType.WIDTH,
    PropertyType.FONT_SIZE,
    PropertyType.BORDER_WIDTH,
    PropertyType.HEIGHT,
  ];

  for (const propType of sizeProperties) {
    it(`should validate ${propType} with valid size value`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        { type: propType, value: createValidSize() },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it(`should reject ${propType} with invalid size values`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT);

      // Non-object value
      field.props = [{ type: propType, value: 'string' }] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      // Missing type
      field.props = [
        { type: propType, value: { value: 10, unit: 'px' } },
      ] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Invalid type
      field.props = [
        { type: propType, value: { type: 'invalid', value: 10, unit: 'px' } },
      ] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  }
});
