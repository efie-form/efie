import type { FormSchema } from '@efie-form/core';
import { PropertyType } from '@efie-form/core';
import { renderHook, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCondition } from '../use-condition';

const createTestSchema = (): FormSchema => ({
  version: '1.0',
  form: {
    fields: [
      {
        id: 'visible-field',
        type: 'short_text',
        form: { name: 'visible' },
        props: [],
      },
      {
        id: 'hidden-field',
        type: 'short_text',
        form: { name: 'hidden' },
        props: [
          {
            type: PropertyType.HIDDEN,
            value: true,
          },
        ],
      },
      {
        id: 'required-field',
        type: 'short_text',
        form: { name: 'required' },
        props: [
          {
            type: PropertyType.REQUIRED,
            value: true,
          },
        ],
      },
    ],
    rules: [],
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('useCondition Integration', () => {
  it('should properly initialize field states based on field properties', async () => {
    const schema = createTestSchema();

    const { result } = renderHook(() => useCondition({ schema }), { wrapper: TestWrapper });

    // Wait for the condition to be initialized and field states to be created
    await waitFor(() => {
      expect(result.current.conditionState.hidden.has('hidden-field')).toBe(true);
    });

    // Check all expected states
    expect(result.current.conditionState.hidden.has('hidden-field')).toBe(true);
    expect(result.current.conditionState.visible.has('visible-field')).toBe(true);
    expect(result.current.conditionState.required.has('required-field')).toBe(true);
    expect(result.current.conditionState.optional.has('visible-field')).toBe(true);
    expect(result.current.conditionState.optional.has('hidden-field')).toBe(true);

    // Test helper functions
    expect(result.current.isFieldHidden('hidden-field')).toBe(true);
    expect(result.current.isFieldVisible('visible-field')).toBe(true);
    expect(result.current.isFieldRequired('required-field')).toBe(true);
  });

  it('should handle field properties correctly with override values', async () => {
    const schema = createTestSchema();
    const initialFieldStates = {
      'hidden-field': {
        touched: false,
        dirty: false,
        valid: true,
        visible: true, // Override hidden to visible
        enabled: true,
        required: false,
      },
    };

    const { result } = renderHook(() => useCondition({ schema, initialFieldStates }), {
      wrapper: TestWrapper,
    });

    // Wait for initialization
    await waitFor(() => {
      expect(result.current.conditionState.visible.has('hidden-field')).toBe(true);
    });

    // The hidden field should now be visible because it was overridden
    expect(result.current.conditionState.hidden.has('hidden-field')).toBe(false);
    expect(result.current.conditionState.visible.has('hidden-field')).toBe(true);
    expect(result.current.isFieldVisible('hidden-field')).toBe(true);
  });
});
