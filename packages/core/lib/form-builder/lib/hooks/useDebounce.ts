import type { DependencyList } from 'react';
import { useEffect } from 'react';
import useTimeoutFn from '@form-builder/lib/hooks/useTimeoutFn';

export type UseDebounceReturn = [() => boolean | null, () => void];

export default function useDebounce(
  fn: () => void,
  ms: number = 0,
  deps: DependencyList = []
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [isReady, cancel];
}
