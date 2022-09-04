import React, { createContext, useEffect, useState } from 'react';

import { getStoredPlayers, storePlayers } from '~/repositories';
import { getStoredClassList, storeClassList } from '~/repositories/classList';
import { classActiveListType } from '~/types';

export type PlayerData = {
  id: number;
  name: string;
};

export type LocalContextData = {
  players: PlayerData[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerData[]>>;
  classList: classActiveListType;
  setClassList: React.Dispatch<React.SetStateAction<classActiveListType>>;
  savePlayers: (data: PlayerData[]) => Promise<void>;
  saveClassList: (data: classActiveListType) => Promise<void>;
};

export const LocalContext = createContext<LocalContextData>({
  players: [],
  setPlayers: () => undefined,
  classList: {},
  setClassList: () => undefined,
  savePlayers: async () => undefined,
  saveClassList: async () => undefined,
});

export const LocalProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [classList, setClassList] = useState<classActiveListType>({});

  useEffect(() => {
    const readData = async () => {
      const stored = await getStoredPlayers();
      const _classStored = await getStoredClassList();

      setPlayers(
        stored.map((item, index) => ({
          id: index,
          name: item,
        }))
      );

      setClassList(_classStored);
    };

    readData();
  }, []);

  const savePlayers = async (data: PlayerData[]) => {
    setPlayers(data);

    await storePlayers(players.map(item => item.name));
  };

  const saveClassList = async (data: classActiveListType) => {
    setClassList(data);

    await storeClassList(classList);
  };

  return (
    <LocalContext.Provider
      value={{
        players,
        setPlayers,
        classList,
        setClassList,
        savePlayers,
        saveClassList,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
};
