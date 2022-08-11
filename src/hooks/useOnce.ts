import { useRef } from 'react';

export const useOnce = (cb: () => void) => {
  const used = useRef(false);

  if (!used.current) {
    cb();

    used.current = true;
  }
};
