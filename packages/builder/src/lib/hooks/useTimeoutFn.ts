import { useCallback, useEffect, useRef } from 'react';

export type UseTimeoutFnReturn = [() => boolean, () => void, () => void];

export default function useTimeoutFn(
  fn: () => void,
  ms: number = 0,
): UseTimeoutFnReturn {
  const ready = useRef<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = false;
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms, set, clear]);

  return [isReady, clear, set];
}
