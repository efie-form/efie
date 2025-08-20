import type { FormSchema } from '@efie-form/core';
import { act, renderHook } from '@testing-library/react';
import { useRuleEngine } from '../use-rule-engine';

const mockSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'trigger-field',
        type: 'short_text',
        form: { name: 'trigger' },
        props: [{ type: 'label', value: 'Trigger' }],
      },
      {
        id: 'target-field',
        type: 'short_text',
        form: { name: 'target' },
        props: [{ type: 'label', value: 'Target' }],
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
    ],
  },
};

describe('useRuleEngine', () => {
  it('should initialize with empty field updates', () => {
    const { result } = renderHook(() =>
      useRuleEngine({
        schema: mockSchema,
        fieldValues: {},
        debounceMs: 0, // Disable debouncing for tests
      }),
    );

    expect(result.current.fieldUpdates).toEqual([]);
    expect(result.current.customActions).toEqual([]);
    expect(result.current.isEvaluating).toBe(false);
  });

  it('should trigger field updates when conditions are met', async () => {
    const { result, rerender } = renderHook(
      ({ fieldValues }) =>
        useRuleEngine({
          schema: mockSchema,
          fieldValues,
          debounceMs: 0,
        }),
      {
        initialProps: { fieldValues: {} },
      },
    );

    // Wait for initial evaluation
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.fieldUpdates).toEqual([]);

    // Update field value to trigger rule
    await act(async () => {
      rerender({ fieldValues: { 'trigger-field': 'show' } });
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.fieldUpdates).toContainEqual({
      fieldId: 'target-field',
      visible: true,
    });
  });

  it('should provide field state getters', async () => {
    const { result } = renderHook(() =>
      useRuleEngine({
        schema: mockSchema,
        fieldValues: { 'trigger-field': 'show' },
        debounceMs: 0,
      }),
    );

    // Wait for evaluation
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.getFieldVisible('target-field')).toBe(true);
    expect(result.current.getFieldRequired('target-field')).toBe(false);
  });

  it('should handle field states', async () => {
    const { result } = renderHook(() =>
      useRuleEngine({
        schema: mockSchema,
        fieldValues: { 'trigger-field': 'show' },
        fieldStates: {
          'trigger-field': { touched: true, dirty: true, valid: true },
        },
        debounceMs: 0,
      }),
    );

    // Wait for evaluation
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.fieldUpdates).toContainEqual({
      fieldId: 'target-field',
      visible: true,
    });
  });

  it('should handle environment variables', async () => {
    const schemaWithEnv: FormSchema = {
      ...mockSchema,
      form: {
        ...mockSchema.form,
        rules: [
          {
            id: 'env-rule',
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
                id: 'show-admin',
                type: 'show_fields',
                fields: ['target-field'],
              },
            ],
          },
        ],
      },
    };

    const { result } = renderHook(() =>
      useRuleEngine({
        schema: schemaWithEnv,
        fieldValues: {},
        environmentVariables: { userRole: 'admin' },
        debounceMs: 0,
      }),
    );

    // Wait for evaluation
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.fieldUpdates).toContainEqual({
      fieldId: 'target-field',
      visible: true,
    });
  });
});
