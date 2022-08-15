import { useRef } from 'react';

export function useOnChange<T = void, D extends any[] = []>(
  cb: () => T,
  deps: D
) {
  const value = useRef<T>();
  const prev = useRef<D>();

  const trigger =
    !prev.current ||
    deps.some((item, index) => {
      return (prev.current as D)[index] !== item;
    });

  if (trigger) {
    prev.current = Array.from(deps) as D;

    value.current = cb();
  }

  return value.current as T;
}
