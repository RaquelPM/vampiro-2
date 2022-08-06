import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { useLocal } from '~/hooks';

export type PlayerData = {
  id: number;
  name: string;
};

export const usePlayers = () => {
  const local = useLocal();

  const [players, setPlayers] = useState(local.players);

  const id = useRef(players.length);

  const positions = useSharedValue<Record<number, number>>(
    players.reduce((acc, curr, index) => {
      return { ...acc, [curr.id]: index };
    }, {})
  );

  const createPlayer = (name: string) => {
    positions.value = {
      ...positions.value,
      [id.current]: players.length,
    };

    setPlayers(prev => {
      return [
        ...prev,
        {
          id: id.current,
          name,
        },
      ];
    });

    id.current += 1;
  };

  const editPlayer = (key: number, name: string) => {
    setPlayers(prev => {
      return prev.map(item => {
        if (item.id === key) {
          return {
            ...item,
            name,
          };
        }

        return item;
      });
    });
  };

  const deletePlayer = (key: number) => {
    const newPositions: typeof positions.value = {};

    players.forEach(item => {
      if (item.id === key) {
        return;
      }

      if (positions.value[item.id] > positions.value[key]) {
        newPositions[item.id] = positions.value[item.id] - 1;
      } else {
        newPositions[item.id] = positions.value[item.id];
      }
    });

    positions.value = newPositions;

    setPlayers(prev => {
      return prev.filter(item => item.id !== key);
    });
  };

  const swapPlayers = (indexA: number, indexB: number) => {
    if (indexA < 0 || indexA >= players.length) {
      return;
    }

    if (indexB < 0 || indexB >= players.length) {
      return;
    }

    const newPositions: typeof positions.value = {};

    players.forEach(item => {
      if (positions.value[item.id] === indexA) {
        newPositions[item.id] = indexB;
      } else if (positions.value[item.id] === indexB) {
        newPositions[item.id] = indexA;
      } else {
        newPositions[item.id] = positions.value[item.id];
      }
    });

    positions.value = newPositions;
  };

  const savePlayers = async () => {
    const ordered = players.sort(
      (a, b) => positions.value[a.id] - positions.value[b.id]
    );

    await local.savePlayers(ordered);
  };

  return {
    players,
    positions,
    createPlayer,
    editPlayer,
    deletePlayer,
    swapPlayers,
    savePlayers,
  };
};
