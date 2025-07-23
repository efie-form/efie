import { FieldType } from '../../../../constants/field-type';
import { PropertyType } from '../../../../constants/form-schema.constant';
import validateSchema from '../../index';
import {
  createValidColor,
  createValidField,
  createValidSchema,
  createValidSize,
} from '../helpers/test-helpers';

describe('validateSchema - Complex property types', () => {
  describe('Border radius property', () => {
    it('should validate BORDER_RADIUS with valid value', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        {
          type: PropertyType.BORDER_RADIUS,
          value: {
            topLeft: createValidSize(),
            topRight: createValidSize(),
            bottomLeft: createValidSize(),
            bottomRight: createValidSize(),
          },
        },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should reject BORDER_RADIUS with invalid values', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT);

      // Non-object value
      field.props = [
        { type: PropertyType.BORDER_RADIUS, value: 'string' },
      ] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      // Missing properties
      field.props = [
        { type: PropertyType.BORDER_RADIUS, value: { topLeft: createValidSize() } },
      ] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Invalid size values
      field.props = [
        {
          type: PropertyType.BORDER_RADIUS,
          value: {
            topLeft: 'invalid',
            topRight: createValidSize(),
            bottomLeft: createValidSize(),
            bottomRight: createValidSize(),
          },
        },
      ] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  });

  describe('Margin and Padding properties', () => {
    for (const propType of [PropertyType.MARGIN, PropertyType.PADDING]) {
      it(`should validate ${propType} with valid value`, () => {
        const schema = createValidSchema();
        const field = createValidField(FieldType.SHORT_TEXT, [
          {
            type: propType,
            value: {
              top: createValidSize(),
              right: createValidSize(),
              bottom: createValidSize(),
              left: createValidSize(),
            },
          },
        ]);
        schema.form.fields = [field];
        expect(validateSchema(schema)).toBe(true);
      });

      it(`should reject ${propType} with invalid values`, () => {
        const schema = createValidSchema();
        const field = createValidField(FieldType.SHORT_TEXT);

        // Non-object value
        field.props = [{ type: propType, value: 'string' }] as unknown as typeof field.props;
        schema.form.fields = [field];
        expect(validateSchema(schema)).toBe(false);

        // Missing properties
        field.props = [
          { type: propType, value: { top: createValidSize() } },
        ] as unknown as typeof field.props;
        expect(validateSchema(schema)).toBe(false);

        // Invalid size values
        field.props = [
          {
            type: propType,
            value: {
              top: 'invalid',
              right: createValidSize(),
              bottom: createValidSize(),
              left: createValidSize(),
            },
          },
        ] as unknown as typeof field.props;
        expect(validateSchema(schema)).toBe(false);
      });
    }
  });

  describe('Box shadow property', () => {
    it('should validate BOX_SHADOW with valid value', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        {
          type: PropertyType.BOX_SHADOW,
          value: [
            {
              x: createValidSize(),
              y: createValidSize(),
              blur: createValidSize(),
              spread: createValidSize(),
              color: createValidColor(),
            },
          ],
        },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should validate BOX_SHADOW with empty array', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT, [
        { type: PropertyType.BOX_SHADOW, value: [] },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should reject BOX_SHADOW with invalid values', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SHORT_TEXT);

      // Non-array value
      field.props = [
        { type: PropertyType.BOX_SHADOW, value: 'string' },
      ] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      // Invalid shadow object
      field.props = [
        { type: PropertyType.BOX_SHADOW, value: ['invalid'] },
      ] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Missing properties in shadow
      field.props = [
        { type: PropertyType.BOX_SHADOW, value: [{ x: createValidSize() }] },
      ] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  });
});
