import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { StackScreenProps } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { NavigationScreens } from '~/types';

import { Alert, Tutorial } from '~/components';
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

export type PlayersScreenProps = StackScreenProps<NavigationScreens, 'Players'>;

export const Players = ({ navigation }: PlayersScreenProps) => {
  const {
    players,
    positions,
    createPlayer,
    editPlayer,
    deletePlayer,
    swapPlayers,
    savePlayers,
  } = usePlayers();

  const [playerInput, setPlayerInput] = useState(false);
  const [selected, setSelected] = useState<PlayerData | null>(null);
  const [alert, setAlert] = useState(false);

  const scroll = useSharedValue(0);
  const scrollHeight = useSharedValue(0);
  const active = useSharedValue(-1);

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

  const onGoToNext = async () => {
    if (players.length < 4) {
      setAlert(true);

      return;
    }

    await savePlayers();

    // navigation.navigate('Game', {
    //   screen: 'Turn',
    // });

    navigation.navigate('ClassesList');
  };

  return (
    <Container>
      <Alert visible={alert} onConfirm={() => setAlert(false)}>
        São necessários ao menos 4 jogadores para iniciar o jogo.
      </Alert>
      <PlayerInput
        visible={playerInput || !!selected}
        editName={selected?.name}
        onClose={() => [setSelected(null), setPlayerInput(false)]}
        onSubmit={onSubmitPlayer}
        onDelete={onDeletePlayer}
      />
      <Tutorial>
        Segure e arraste <Feather name="menu" size={18} /> para alterar a ordem
        e clique no nome para editar. Clique no botão vermelho para adicionar um
        jogador.
      </Tutorial>
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
              active={active}
              positions={positions}
              onPress={() => setSelected(item)}
              onSwap={target => swapPlayers(positions.value[item.id], target)}
            />
          ))}
        </List>
      </ListWrapper>
      <AddBtn onPress={() => setPlayerInput(true)}>
        <AddLabel>Adicionar Jogador</AddLabel>
        <FontAwesome name="plus" color="white" size={20} />
      </AddBtn>
      <NextBtn size="large" onPress={onGoToNext}>
        Prosseguir
      </NextBtn>
    </Container>
  );
};
