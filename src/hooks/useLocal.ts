import { useContext } from 'react';

import { LocalContext } from '~/contexts/local';

export const useLocal = () => {
  return useContext(LocalContext);
};
