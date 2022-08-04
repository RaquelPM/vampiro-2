import React, { useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { NavigationScreens } from '~/types';

import {
  NextBtn,
  Container,
  EmptyListLabel,
  ListWrapper,
  AddBtn,
  AddLabel,
} from './styles';
import { Player } from './Player';
import { PlayerInput } from './PlayerInput';

export type PlayersProps = StackScreenProps<NavigationScreens, 'Players'>;

type PlayerData = {
  name: string;
  key: number;
};

export const Players = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [playerInput, setPlayerInput] = useState(false);
  const [editPlayer, setEditPlayer] = useState<PlayerData | null>(null);

  const id = useRef(0);

  const handleAddPlayer = (name: string) => {
    if (editPlayer) {
      setPlayers(prev => {
        const list = prev.map(item => {
          return item.key !== editPlayer.key
            ? item
            : {
                ...item,
                name,
              };
        });

        return list;
      });

      setEditPlayer(null);

      return;
    }

    setPlayers(prev => {
      return [
        ...prev,
        {
          name,
          key: id.current,
        },
      ];
    });

    id.current += 1;

    setPlayerInput(false);
  };

  const handleRemovePlayer = () => {
    setPlayers(prev => {
      return prev.filter(item => item.key !== editPlayer?.key);
    });

    setEditPlayer(null);
  };

  return (
    <Container>
      <PlayerInput
        visible={playerInput || !!editPlayer}
        editName={editPlayer?.name}
        onClose={() => [setPlayerInput(false), setEditPlayer(null)]}
        onSubmit={handleAddPlayer}
        onDelete={handleRemovePlayer}
      />
      <ListWrapper>
        {players.length === 0 && (
          <EmptyListLabel>
            Ainda não há nenhum jogador adicionado.
          </EmptyListLabel>
        )}
        {players.map(item => (
          <Player
            key={item.key}
            id={item.key}
            name={item.name}
            drag={() => null}
            isActive={false}
            onPress={() => setEditPlayer(item)}
          />
        ))}
      </ListWrapper>
      <AddBtn onPress={() => setPlayerInput(true)}>
        <AddLabel>Adicionar Jogador</AddLabel>
        <Icon name="plus" color="white" size={20} />
      </AddBtn>
      <NextBtn size="large">Prosseguir</NextBtn>
    </Container>
  );
};
