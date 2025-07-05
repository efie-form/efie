import { FieldType } from '../../../../constants/field-type';
import { PropertyType } from '../../../../constants/form-schema.constant';
import validateSchema from '../../index';
import { createValidSchema, createValidField } from '../helpers/test-helpers';

describe('validateSchema - Specialized property types', () => {
  describe('Accept property', () => {
    it('should validate ACCEPT with valid value', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.FILE, [
        {
          type: PropertyType.ACCEPT,
          value: {
            allowAll: false,
            formats: ['image/*', '.pdf'],
          },
        },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should reject ACCEPT with invalid values', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.FILE);

      // Non-object value
      field.props = [{ type: PropertyType.ACCEPT, value: 'string' }] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      // Missing properties
      field.props = [{ type: PropertyType.ACCEPT, value: { allowAll: true } }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Invalid formats type
      field.props = [{ type: PropertyType.ACCEPT, value: { allowAll: true, formats: 'string' } }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  });

  describe('Options property', () => {
    it('should validate OPTIONS with valid value', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SINGLE_CHOICE, [
        {
          type: PropertyType.OPTIONS,
          value: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ],
        },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should validate OPTIONS with empty array', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SINGLE_CHOICE, [
        { type: PropertyType.OPTIONS, value: [] },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should reject OPTIONS with invalid values', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.SINGLE_CHOICE);

      // Non-array value
      field.props = [{ type: PropertyType.OPTIONS, value: 'string' }] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      // Invalid option objects
      field.props = [{ type: PropertyType.OPTIONS, value: ['invalid'] }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Missing label or value
      field.props = [{ type: PropertyType.OPTIONS, value: [{ label: 'Option 1' }] }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  });

  describe('Button action property', () => {
    it('should validate BUTTON_ACTION with submit action', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.BUTTON, [
        {
          type: PropertyType.BUTTON_ACTION,
          value: { action: 'submit' },
        },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should validate BUTTON_ACTION with hyperlink action', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.BUTTON, [
        {
          type: PropertyType.BUTTON_ACTION,
          value: {
            action: 'hyperlink',
            url: 'https://example.com',
            target: '_blank',
          },
        },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should validate BUTTON_ACTION with hyperlink action without target', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.BUTTON, [
        {
          type: PropertyType.BUTTON_ACTION,
          value: {
            action: 'hyperlink',
            url: 'https://example.com',
          },
        },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should reject BUTTON_ACTION with invalid values', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.BUTTON);

      // Non-object value
      field.props = [{ type: PropertyType.BUTTON_ACTION, value: 'string' }] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      // Missing action
      field.props = [{ type: PropertyType.BUTTON_ACTION, value: {} }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Invalid action type
      field.props = [{ type: PropertyType.BUTTON_ACTION, value: { action: 'invalid' } }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Hyperlink without URL
      field.props = [{ type: PropertyType.BUTTON_ACTION, value: { action: 'hyperlink' } }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);

      // Hyperlink with invalid URL type
      field.props = [{ type: PropertyType.BUTTON_ACTION, value: { action: 'hyperlink', url: 123 } }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  });

  describe('Content property', () => {
    it('should validate CONTENT with valid JSON content', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.HEADER, [
        {
          type: PropertyType.CONTENT,
          value: { jsonContent: { type: 'doc', content: [] } },
        },
      ]);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });

    it('should reject CONTENT with invalid values', () => {
      const schema = createValidSchema();
      const field = createValidField(FieldType.HEADER);

      // Non-object value
      field.props = [{ type: PropertyType.CONTENT, value: 'string' }] as unknown as typeof field.props;
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(false);

      // Missing jsonContent
      field.props = [{ type: PropertyType.CONTENT, value: {} }] as unknown as typeof field.props;
      expect(validateSchema(schema)).toBe(false);
    });
  });
});
