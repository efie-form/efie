import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormProvider } from '../lib/components/form-provider';
import { FormContext } from '../lib/form-context';
import { useContext } from 'react';

// Mock the React version utility
vi.mock('../lib/utils/react-version', () => ({
  isReact19OrHigher: vi.fn(),
}));

import { isReact19OrHigher } from '../lib/utils/react-version';

// Test component that consumes the FormContext
function TestConsumer() {
  const context = useContext(FormContext);
  return <div data-testid="context-value">{JSON.stringify(context)}</div>;
}

const mockSchema = {
  form: {
    fields: [],
    settings: {},
  },
  validations: {},
};

describe('FormProvider', () => {
  it('should use Context.Provider for React 18', () => {
    (isReact19OrHigher as any).mockReturnValue(false);

    const testProps = { schema: mockSchema, testProp: 'test-value' };

    render(
      <FormProvider {...testProps}>
        <TestConsumer />
      </FormProvider>,
    );

    const contextValue = screen.getByTestId('context-value');
    expect(contextValue).toBeInTheDocument();
    expect(contextValue.textContent).toContain('test-value');
  });

  it('should use Context directly for React 19+', () => {
    (isReact19OrHigher as any).mockReturnValue(true);

    const testProps = { schema: mockSchema, testProp: 'test-value-19' };

    render(
      <FormProvider {...testProps}>
        <TestConsumer />
      </FormProvider>,
    );

    const contextValue = screen.getByTestId('context-value');
    expect(contextValue).toBeInTheDocument();
    expect(contextValue.textContent).toContain('test-value-19');
  });
});
