import { useOnChange } from './useOnChange';

export function useOnce<T = void>(cb: () => T) {
  const value = useOnChange(cb, []);

  return value;
}
