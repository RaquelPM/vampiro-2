import { useContext } from 'react';

import { LocalContext } from '~/contexts';

export const useLocal = () => {
  return useContext(LocalContext);
};
