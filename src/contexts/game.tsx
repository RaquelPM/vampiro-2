import React, { createContext, useRef } from 'react';

import { Game } from '~/game';
import { useLocal } from '~/hooks';

export const GameContext = createContext({} as Game);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const { players } = useLocal();

  const game = useRef(new Game(players.map(item => item.name)));

  return (
    <GameContext.Provider value={game.current}>{children}</GameContext.Provider>
  );
};
