import { useRef } from 'react';

function useThrottle<T extends (...props: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...props: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();
  return (...props) => {
    if (timeoutRef.current) return;
    fn(...props);
    timeoutRef.current = setTimeout(() => {
      if (!timeoutRef.current) return;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }, delay);
  };
}

export default useThrottle;
