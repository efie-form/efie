import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FormContext } from '../../form-context';
import { FormContextProvider } from '../form-provider';

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
      <FormContextProvider {...testProps}>
        <TestConsumer />
      </FormContextProvider>,
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
        <button type="button" data-testid="set-page-button" onClick={() => setPage('new-page')}>
          Set Page
        </button>
      );
    }

    render(
      <FormContextProvider {...testProps}>
        <TestWithCallback />
      </FormContextProvider>,
    );

    const button = screen.getByTestId('set-page-button');
    button.click();

    expect(setPageMock).toHaveBeenCalledWith('new-page');
  });
});
