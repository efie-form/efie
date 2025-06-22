import { FieldType } from '@efie-form/core';
import type { FormSchema } from '@efie-form/core';
import checkSchema from '../lib/check-schema';

describe('checkSchema', () => {
  const validSchema: FormSchema = {
    version: 'v1',
    form: {
      fields: [
        {
          id: 'page-1',
          type: FieldType.PAGE,
          children: [
            {
              id: 'block-1',
              type: FieldType.BLOCK,
              children: [
                {
                  id: 'field-1',
                  type: FieldType.SHORT_TEXT,
                  form: {
                    key: 'test-field',
                    validation: [
                      {
                        type: 'standard',
                        message: 'This field is required',
                        operator: 'equals',
                        value: '',
                      },
                    ],
                  },
                  props: [
                    {
                      type: 'label',
                      value: 'Test Field',
                    },
                    {
                      type: 'required',
                      value: true,
                    },
                  ],
                },
              ],
              props: [
                {
                  type: 'padding',
                  value: {
                    top: { type: 'length', value: 16, unit: 'px' },
                    right: { type: 'length', value: 16, unit: 'px' },
                    bottom: { type: 'length', value: 16, unit: 'px' },
                    left: { type: 'length', value: 16, unit: 'px' },
                  },
                },
              ],
            },
          ],
          props: [
            {
              type: 'pageName',
              value: 'Test Page',
            },
          ],
        },
      ],
      rules: [
        {
          type: 'page',
          conditions: {
            fieldId: 'field-1',
            operator: 'equals',
            value: 'test',
          },
          action: {
            type: 'show',
            pages: ['page-2'],
          },
        },
      ],
    },
  };

  describe('valid schemas', () => {
    it('should return true for a valid schema', () => {
      expect(checkSchema(validSchema)).toBe(true);
    });

    it('should return true for a minimal valid schema', () => {
      const minimalSchema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [],
        },
      };
      expect(checkSchema(minimalSchema)).toBe(true);
    });

    it('should return true for schema with complex validation', () => {
      const complexValidationSchema: FormSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'field-1',
              type: FieldType.SHORT_TEXT,
              form: {
                key: 'test',
                validation: [
                  {
                    type: 'group',
                    operator: 'and',
                    rules: [
                      {
                        type: 'standard',
                        message: 'Required',
                        operator: 'equals',
                        value: '',
                      },
                      {
                        type: 'standard',
                        message: 'Too short',
                        operator: 'greaterThan',
                        value: 5,
                      },
                    ],
                  },
                ],
              },
              props: [],
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(complexValidationSchema)).toBe(true);
    });
  });

  describe('invalid schemas', () => {
    it('should return false for undefined', () => {
      const undefinedValue = undefined;
      expect(checkSchema(undefinedValue)).toBe(false);
    });

    it('should return false for non-object types', () => {
      expect(checkSchema('string')).toBe(false);
      expect(checkSchema(123)).toBe(false);
      expect(checkSchema(true)).toBe(false);
      expect(checkSchema([])).toBe(false);
    });

    it('should return false for schema without version', () => {
      const invalidSchema = {
        form: {
          fields: [],
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for schema with empty version', () => {
      const invalidSchema = {
        version: '',
        form: {
          fields: [],
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for schema without form property', () => {
      const invalidSchema = {
        version: 'v1',
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for schema with non-object form', () => {
      const invalidSchema = {
        version: 'v1',
        form: 'invalid',
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for schema without fields array', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for schema without rules array', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          fields: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for field without id', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              type: FieldType.SHORT_TEXT,
              props: [],
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for field without type', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'field-1',
              props: [],
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for field with invalid type', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'field-1',
              type: 'invalid_type',
              props: [],
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for field with invalid props', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'field-1',
              type: FieldType.SHORT_TEXT,
              props: 'invalid',
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for field with invalid form property', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'field-1',
              type: FieldType.SHORT_TEXT,
              form: {
                // Missing key property
              },
              props: [],
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for invalid validation schema', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'field-1',
              type: FieldType.SHORT_TEXT,
              form: {
                key: 'test',
                validation: [
                  {
                    type: 'standard',
                    // Missing required properties
                  },
                ],
              },
              props: [],
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });

    it('should return false for invalid root rule', () => {
      const invalidSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              type: 'page',
              // Missing conditions and action
            },
          ],
        },
      };
      expect(checkSchema(invalidSchema)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty objects', () => {
      expect(checkSchema({})).toBe(false);
    });

    it('should handle nested field validation', () => {
      const nestedSchema: FormSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'page-1',
              type: FieldType.PAGE,
              children: [
                {
                  id: 'row-1',
                  type: FieldType.ROW,
                  children: [
                    {
                      id: 'col-1',
                      type: FieldType.COLUMN,
                      children: [
                        {
                          id: 'field-1',
                          type: FieldType.SHORT_TEXT,
                          form: {
                            key: 'nested-field',
                          },
                          props: [],
                        },
                      ],
                      props: [],
                    },
                  ],
                  props: [],
                },
              ],
              props: [],
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(nestedSchema)).toBe(true);
    });

    it('should handle fields with container properties', () => {
      const containerSchema: FormSchema = {
        version: 'v1',
        form: {
          fields: [
            {
              id: 'field-1',
              type: FieldType.SHORT_TEXT,
              form: {
                key: 'test',
              },
              props: [],
              container: {
                props: [
                  {
                    type: 'width',
                    value: { type: 'percentage', value: 100 },
                  },
                ],
              },
            },
          ],
          rules: [],
        },
      };
      expect(checkSchema(containerSchema)).toBe(true);
    });
  });
});
