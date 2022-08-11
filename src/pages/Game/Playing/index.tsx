import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { components, componentsOrder } from '~/game';
import { useGame } from '~/hooks';
import { GameNavigationScreens } from '~/types';

import { Container, Moon } from './styles';

export type PlayingScreenProps = StackScreenProps<
  GameNavigationScreens,
  'Playing'
>;

export const Playing = () => {
  const game = useGame();

  game.useReactive();

  const tree = game.currentPlayer.render(game);

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
