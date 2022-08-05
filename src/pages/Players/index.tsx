import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { NavigationScreens } from '~/types';

import {
  NextBtn,
  Container,
  EmptyListLabel,
  AddBtn,
  AddLabel,
  List,
  ListWrapper,
} from './styles';
import { Player } from './Player';
import { PlayerInput } from './PlayerInput';
import { PlayerData, usePlayers } from './hooks';

export type PlayersProps = StackScreenProps<NavigationScreens, 'Players'>;

export const Players = () => {
  const {
    players,
    positions,
    createPlayer,
    editPlayer,
    deletePlayer,
    swapPlayers,
  } = usePlayers();

  const [playerInput, setPlayerInput] = useState(false);
  const [selected, setSelected] = useState<PlayerData | null>(null);

  const scroll = useSharedValue(0);
  const scrollHeight = useSharedValue(0);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const onScroll = useAnimatedScrollHandler(e => {
    scroll.value = e.contentOffset.y;
  });

  const onScrollLayout = (e: LayoutChangeEvent) => {
    scrollHeight.value = e.nativeEvent.layout.height;
  };

  const onSubmitPlayer = (name: string) => {
    if (selected) {
      editPlayer(selected.id, name);

      setSelected(null);

      return;
    }

    createPlayer(name);

    setPlayerInput(false);
  };

  const onDeletePlayer = () => {
    if (!selected) {
      return;
    }

    deletePlayer(selected.id);

    setSelected(null);
  };

  return (
    <Container>
      <PlayerInput
        visible={playerInput || !!selected}
        editName={selected?.name}
        onClose={() => [setSelected(null), setPlayerInput(false)]}
        onSubmit={onSubmitPlayer}
        onDelete={onDeletePlayer}
      />
      <ListWrapper>
        <List
          ref={scrollRef}
          length={players.length}
          onScroll={onScroll}
          onLayout={onScrollLayout}
        >
          {players.length === 0 && (
            <EmptyListLabel>
              Ainda não há nenhum jogador adicionado.
            </EmptyListLabel>
          )}
          {players.map(item => (
            <Player
              id={item.id}
              key={item.id}
              name={item.name}
              length={players.length}
              scroll={scroll}
              scrollRef={scrollRef}
              scrollHeight={scrollHeight}
              positions={positions}
              onPress={() => setSelected(item)}
              onShift={target => swapPlayers(positions.value[item.id], target)}
            />
          ))}
        </List>
      </ListWrapper>
      <AddBtn onPress={() => setPlayerInput(true)}>
        <AddLabel>Adicionar Jogador</AddLabel>
        <Icon name="plus" color="white" size={20} />
      </AddBtn>
      <NextBtn size="large">Prosseguir</NextBtn>
    </Container>
  );
};
