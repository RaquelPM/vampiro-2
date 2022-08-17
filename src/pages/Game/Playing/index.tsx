import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { components, componentsOrder } from '~/game';
import { useGame, useOnce } from '~/hooks';
import { GameNavigationScreens } from '~/types';

import { Container, Moon } from './styles';

export type PlayingScreenProps = StackScreenProps<
  GameNavigationScreens,
  'Playing'
>;

export const Playing = ({ navigation }: PlayingScreenProps) => {
  const game = useGame();

  game.useControllers();

  const player = useOnce(() => {
    return game.currentPlayer;
  });

  const tree = player.render(game, () => {
    game.controllers.playersList.setSelectedIndex(-1);

    const turn = game.nextTurn();

    if (turn !== -1) {
      navigation.replace('Turn');
    } else {
      game.afterEachNight();
    }
  });

  return (
    <Container>
      <Moon />
      {componentsOrder
        .filter(key => !!tree[key])
        .map(key => {
          const Component = components[key].component;

          return <Component key={key} game={game} {...tree[key]} />;
        })}
    </Container>
  );
};
