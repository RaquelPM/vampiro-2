import { useContext } from 'react';

import { GameContext } from '~/contexts/game';

export const useGame = () => {
  return useContext(GameContext);
};
