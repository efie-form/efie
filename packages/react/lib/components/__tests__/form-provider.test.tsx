import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormProvider } from '../form-provider';
import { FormContext } from '../../form-context';
import { useContext } from 'react';

// Mock the React version utility
vi.mock('../../utils/react-version', () => ({
  isReact19OrHigher: vi.fn(),
}));

import { isReact19OrHigher } from '../../utils/react-version';

// Test component that consumes the FormContext
function TestConsumer() {
  const context = useContext(FormContext);
  return <div data-testid="context-value">{JSON.stringify(context)}</div>;
}

describe('FormProvider', () => {
  it('should provide context values to children', () => {
    vi.mocked(isReact19OrHigher).mockReturnValue(false);

    const setPageMock = vi.fn();
    const testProps = {
      page: 'test-page',
      setPage: setPageMock,
    };

    render(
      <FormProvider {...testProps}>
        <TestConsumer />
      </FormProvider>,
    );

    const contextValue = screen.getByTestId('context-value');
    expect(contextValue).toBeInTheDocument();
    expect(contextValue.textContent).toContain('test-page');
  });

  it('should call setPage function correctly', () => {
    vi.mocked(isReact19OrHigher).mockReturnValue(false);

    const setPageMock = vi.fn();
    const testProps = {
      page: 'initial-page',
      setPage: setPageMock,
    };

    function TestWithCallback() {
      const { setPage } = useContext(FormContext);
      return (
        <button
          data-testid="set-page-button"
          onClick={() => setPage('new-page')}
        >
          Set Page
        </button>
      );
    }

    render(
      <FormProvider {...testProps}>
        <TestWithCallback />
      </FormProvider>,
    );

    const button = screen.getByTestId('set-page-button');
    button.click();

    expect(setPageMock).toHaveBeenCalledWith('new-page');
  });
});
