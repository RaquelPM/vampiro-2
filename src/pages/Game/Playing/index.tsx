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

  game.useReactive();

  const player = useOnce(() => {
    return game.currentPlayer;
  });

  const tree = player.render(game, () => {
    game.selectedIndex = -1;

    game.nextTurn();

    navigation.replace('Turn');
  });

  return (
    <Container>
      <Moon />
      {componentsOrder
        .filter(key => !!tree[key])
        .map(key => {
          const Component = components[key];

          return <Component key={key} game={game} {...tree[key]} />;
        })}
    </Container>
  );
};
