import { useRef } from 'react';

export function useOnce<T = void>(cb: () => T) {
  const value = useRef<T>(cb());

  return value.current;
}
