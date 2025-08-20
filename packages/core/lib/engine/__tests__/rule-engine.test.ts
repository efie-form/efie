import type { FormSchema } from '../../types/form-schema.type';
import type { JsonValue } from '../../types/root-rule.type';
import type { FieldState, RuleEvaluationContext } from '../rule-engine';
import { RuleEngine } from '../rule-engine';

describe('RuleEngine', () => {
  let ruleEngine: RuleEngine;

  beforeEach(() => {
    ruleEngine = new RuleEngine();
  });

  afterEach(() => {
    ruleEngine.clearCache();
  });

  const createTestSchema = (): FormSchema => ({
    version: 'v1',
    form: {
      fields: [
        {
          id: 'trigger-field',
          type: 'short_text',
          form: { name: 'trigger' },
          props: [{ type: 'label', value: 'Trigger Field' }],
        },
        {
          id: 'target-field',
          type: 'short_text',
          form: { name: 'target' },
          props: [{ type: 'label', value: 'Target Field' }],
        },
      ],
      rules: [
        {
          id: 'visibility-rule',
          enabled: true,
          when: {
            logic: 'all',
            children: [
              {
                left: { kind: 'fieldValue', field: 'trigger-field' },
                operator: 'equal',
                right: { kind: 'constant', value: 'show' },
              },
            ],
          },
          actions: [
            {
              id: 'show-action',
              type: 'show_fields',
              fields: ['target-field'],
            },
          ],
        },
        {
          id: 'required-rule',
          enabled: true,
          when: {
            logic: 'all',
            children: [
              {
                left: { kind: 'fieldValue', field: 'trigger-field' },
                operator: 'equal',
                right: { kind: 'constant', value: 'require' },
              },
            ],
          },
          actions: [
            {
              id: 'require-action',
              type: 'set_required',
              fields: ['target-field'],
              value: true,
            },
          ],
        },
      ],
    },
  });

  const createTestContext = (fieldValues: Record<string, JsonValue>): RuleEvaluationContext => {
    const fields: Record<string, FieldState> = {};

    for (const [fieldId, value] of Object.entries(fieldValues)) {
      fields[fieldId] = {
        value,
        touched: false,
        dirty: false,
        valid: true,
        visible: true,
        enabled: true,
        required: false,
      };
    }

    return {
      fields,
      env: {},
      now: new Date('2024-01-01T12:00:00Z'),
      today: new Date('2024-01-01T00:00:00Z'),
    };
  };

  describe('Basic Rule Evaluation', () => {
    it('should trigger visibility rule when condition is met', () => {
      const schema = createTestSchema();
      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'trigger-field': 'show',
        'target-field': '',
      });

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'target-field',
        visible: true,
      });
    });

    it('should not trigger visibility rule when condition is not met', () => {
      const schema = createTestSchema();
      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'trigger-field': 'hide',
        'target-field': '',
      });

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).not.toContainEqual({
        fieldId: 'target-field',
        visible: true,
      });
    });

    it('should trigger required rule when condition is met', () => {
      const schema = createTestSchema();
      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'trigger-field': 'require',
        'target-field': '',
      });

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'target-field',
        required: true,
      });
    });
  });

  describe('Operator Evaluation', () => {
    it('should handle string equality operators correctly', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'string-test',
              enabled: true,
              when: {
                logic: 'all',
                children: [
                  {
                    left: { kind: 'fieldValue', field: 'text-field' },
                    operator: 'contains',
                    right: { kind: 'constant', value: 'test' },
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'show_fields',
                  fields: ['result-field'],
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'text-field': 'this is a test string',
      });

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'result-field',
        visible: true,
      });
    });

    it('should handle number comparison operators correctly', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'number-test',
              enabled: true,
              when: {
                logic: 'all',
                children: [
                  {
                    left: { kind: 'fieldValue', field: 'age-field' },
                    operator: 'greater_than_or_equal',
                    right: { kind: 'constant', value: 18 },
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'set_required',
                  fields: ['id-field'],
                  value: true,
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'age-field': 21,
      });

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'id-field',
        required: true,
      });
    });

    it('should handle field state operators correctly', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'state-test',
              enabled: true,
              when: {
                logic: 'all',
                children: [
                  {
                    left: { kind: 'fieldState', field: 'input-field', state: 'valid' },
                    operator: 'is_true',
                    right: undefined,
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'show_fields',
                  fields: ['success-field'],
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'input-field': 'valid value',
      });
      context.fields['input-field'].valid = true;

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'success-field',
        visible: true,
      });
    });
  });

  describe('Complex Logic', () => {
    it('should handle ALL logic correctly', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'all-logic-test',
              enabled: true,
              when: {
                logic: 'all',
                children: [
                  {
                    left: { kind: 'fieldValue', field: 'field1' },
                    operator: 'equal',
                    right: { kind: 'constant', value: 'value1' },
                  },
                  {
                    left: { kind: 'fieldValue', field: 'field2' },
                    operator: 'equal',
                    right: { kind: 'constant', value: 'value2' },
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'show_fields',
                  fields: ['result-field'],
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      // Both conditions true
      let context = createTestContext({
        field1: 'value1',
        field2: 'value2',
      });

      let result = ruleEngine.evaluateRules(context);
      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'result-field',
        visible: true,
      });

      // One condition false
      context = createTestContext({
        field1: 'value1',
        field2: 'wrong-value',
      });

      result = ruleEngine.evaluateRules(context);
      expect(result.fieldUpdates).not.toContainEqual({
        fieldId: 'result-field',
        visible: true,
      });
    });

    it('should handle ANY logic correctly', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'any-logic-test',
              enabled: true,
              when: {
                logic: 'any',
                children: [
                  {
                    left: { kind: 'fieldValue', field: 'field1' },
                    operator: 'equal',
                    right: { kind: 'constant', value: 'value1' },
                  },
                  {
                    left: { kind: 'fieldValue', field: 'field2' },
                    operator: 'equal',
                    right: { kind: 'constant', value: 'value2' },
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'show_fields',
                  fields: ['result-field'],
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      // One condition true
      const context = createTestContext({
        field1: 'value1',
        field2: 'wrong-value',
      });

      const result = ruleEngine.evaluateRules(context);
      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'result-field',
        visible: true,
      });
    });

    it('should handle nested condition trees', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'nested-test',
              enabled: true,
              when: {
                logic: 'any',
                children: [
                  {
                    logic: 'all',
                    children: [
                      {
                        left: { kind: 'fieldValue', field: 'field1' },
                        operator: 'equal',
                        right: { kind: 'constant', value: 'a' },
                      },
                      {
                        left: { kind: 'fieldValue', field: 'field2' },
                        operator: 'equal',
                        right: { kind: 'constant', value: 'b' },
                      },
                    ],
                  },
                  {
                    left: { kind: 'fieldValue', field: 'field3' },
                    operator: 'equal',
                    right: { kind: 'constant', value: 'c' },
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'show_fields',
                  fields: ['result-field'],
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      // First nested group true
      let context = createTestContext({
        field1: 'a',
        field2: 'b',
        field3: 'wrong',
      });

      let result = ruleEngine.evaluateRules(context);
      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'result-field',
        visible: true,
      });

      // Second condition true
      context = createTestContext({
        field1: 'wrong',
        field2: 'wrong',
        field3: 'c',
      });

      result = ruleEngine.evaluateRules(context);
      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'result-field',
        visible: true,
      });
    });
  });

  describe('Performance and Caching', () => {
    it('should cache results when dependencies do not change', () => {
      const schema = createTestSchema();
      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'trigger-field': 'show',
        'target-field': '',
      });

      // First evaluation
      const result1 = ruleEngine.evaluateRules(context);

      // Second evaluation with same context
      const result2 = ruleEngine.evaluateRules(context);

      expect(result1).toEqual(result2);
    });

    it('should clear cache when explicitly requested', () => {
      const schema = createTestSchema();
      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'trigger-field': 'show',
        'target-field': '',
      });

      ruleEngine.evaluateRules(context);
      ruleEngine.clearCache();

      // Should work after cache clear
      const result = ruleEngine.evaluateRules(context);
      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'target-field',
        visible: true,
      });
    });
  });

  describe('Environment Variables', () => {
    it('should handle environment variable operands', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'env-test',
              enabled: true,
              when: {
                logic: 'all',
                children: [
                  {
                    left: { kind: 'env', name: 'userRole' },
                    operator: 'equal',
                    right: { kind: 'constant', value: 'admin' },
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'show_fields',
                  fields: ['admin-panel'],
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      const context = createTestContext({});
      context.env = { userRole: 'admin' };

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'admin-panel',
        visible: true,
      });
    });
  });

  describe('Date Operations', () => {
    it('should handle date comparison operators', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'date-test',
              enabled: true,
              when: {
                logic: 'all',
                children: [
                  {
                    left: { kind: 'fieldValue', field: 'birth-date' },
                    operator: 'before',
                    right: { kind: 'constant', value: '2000-01-01' },
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'show_fields',
                  fields: ['adult-field'],
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      const context = createTestContext({
        'birth-date': '1990-01-01',
      });

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'adult-field',
        visible: true,
      });
    });

    it('should handle now and today operands', () => {
      const schema: FormSchema = {
        version: 'v1',
        form: {
          fields: [],
          rules: [
            {
              id: 'now-test',
              enabled: true,
              when: {
                logic: 'all',
                children: [
                  {
                    left: { kind: 'now' },
                    operator: 'after',
                    right: { kind: 'constant', value: '2020-01-01T00:00:00Z' },
                  },
                ],
              },
              actions: [
                {
                  id: 'action-1',
                  type: 'show_fields',
                  fields: ['current-field'],
                },
              ],
            },
          ],
        },
      };

      ruleEngine.updateSchema(schema);

      const context = createTestContext({});

      const result = ruleEngine.evaluateRules(context);

      expect(result.fieldUpdates).toContainEqual({
        fieldId: 'current-field',
        visible: true,
      });
    });
  });
});
