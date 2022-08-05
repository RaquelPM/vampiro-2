import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

export type PlayerData = {
  id: number;
  name: string;
};

export const usePlayers = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);

  const id = useRef(0);

  const positions = useSharedValue<Record<number, number>>({});

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

  return {
    players,
    positions,
    createPlayer,
    editPlayer,
    deletePlayer,
    swapPlayers,
  };
};
