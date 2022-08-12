import { useRef } from 'react';

export function useOnChange<T = void, D extends any[] = []>(
  cb: () => T,
  deps: D
) {
  const value = useRef<T>(cb());
  const prev = useRef<D>(deps);

  if (prev.current !== deps) {
    prev.current = deps;

    value.current = cb();
  }

  return value.current;
}
