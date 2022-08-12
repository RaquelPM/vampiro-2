import React, { createContext } from 'react';

import { Game } from '~/game';
import { useLocal, useOnce } from '~/hooks';

export const GameContext = createContext({} as Game);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const { players } = useLocal();

  const game = useOnce(() => {
    const newGame = new Game(players.map(item => item.name));

    newGame.beforeEachNight();

    return newGame;
  });

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
