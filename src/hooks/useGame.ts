import { useContext } from 'react';

import { GameContext } from '~/contexts';

export const useGame = () => {
  return useContext(GameContext);
};
