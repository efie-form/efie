import { FieldType } from '../../../../constants/field-type';
import type { BlockFormField, PageFormField } from '../../../../types/form-field.type';
import validateSchema from '../../index';
import { createValidField, createValidSchema } from '../helpers/test-helpers';

describe('validateSchema - Field types validation', () => {
  // Test all input field types
  for (const fieldType of Object.values(FieldType)) {
    it(`should validate ${fieldType} field type`, () => {
      const schema = createValidSchema();
      const field = createValidField(fieldType);
      schema.form.fields = [field];
      expect(validateSchema(schema)).toBe(true);
    });
  }

  it('should validate nested field structures', () => {
    const schema = createValidSchema();
    const parentField = createValidField(FieldType.BLOCK) as BlockFormField;
    const childField = createValidField(FieldType.SHORT_TEXT);

    parentField.children = [childField];
    schema.form.fields = [parentField];

    expect(validateSchema(schema)).toBe(true);
  });

  it('should validate deeply nested field structures', () => {
    const schema = createValidSchema();
    const pageField = createValidField(FieldType.PAGE) as PageFormField;
    const blockField = createValidField(FieldType.BLOCK) as BlockFormField;
    const inputField = createValidField(FieldType.SHORT_TEXT);

    blockField.children = [inputField];
    pageField.children = [blockField];
    schema.form.fields = [pageField];

    expect(validateSchema(schema)).toBe(true);
  });
});
