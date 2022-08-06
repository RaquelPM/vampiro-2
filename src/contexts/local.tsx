import React, { createContext, useEffect, useState } from 'react';

import { getStoredPlayers, storePlayers } from '~/repositories';

export type PlayerData = {
  id: number;
  name: string;
};

export type LocalContextData = {
  players: PlayerData[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>;
  savePlayers: (data: PlayerData[]) => Promise<void>;
};

export const LocalContext = createContext<LocalContextData>({
  players: [],
  setPlayers: () => undefined,
  savePlayers: async () => undefined,
});

export const LocalProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    const readData = async () => {
      const stored = await getStoredPlayers();

      setPlayers(
        stored.map((item, index) => ({
          id: index,
          name: item,
        }))
      );
    };

    readData();
  }, []);

  const savePlayers = async (data: PlayerData[]) => {
    setPlayers(data);

    await storePlayers(players.map(item => item.name));
  };

  return (
    <LocalContext.Provider value={{ players, setPlayers, savePlayers }}>
      {children}
    </LocalContext.Provider>
  );
};
