import { FieldType } from '../../../../constants/field-type';
import { PropertyType } from '../../../../constants/form-schema.constant';
import validateSchema from '../../index';
import { createValidField, createValidSchema } from '../helpers/test-helpers';

describe('validateSchema - String property types', () => {
  const stringProperties = [
    PropertyType.PLACEHOLDER,
    PropertyType.SRC,
    PropertyType.ALT,
    PropertyType.BORDER_STYLE,
    PropertyType.PAGE_NAME,
    PropertyType.OBJECT_FIT,
    PropertyType.TEXT_ALIGN,
    PropertyType.TAG,
    PropertyType.LABEL,
  ];

  for (const propType of stringProperties) {
    it(`should validate ${propType} with valid string value`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        { type: propType, value: 'valid string' },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it(`should reject ${propType} with invalid values`, () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT);

      // Non-string values
      field.props = [{ type: propType, value: 123 }] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      field.props = [{ type: propType, value: undefined }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      field.props = [{ type: propType, value: {} }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      field.props = [{ type: propType, value: [] }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  }
});
