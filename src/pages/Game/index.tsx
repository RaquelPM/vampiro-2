import React, { useMemo } from 'react';

import { Components, components, Game as GameClass } from '~/game';
import { Container, Moon } from './styles';

export const Game = () => {
  const game = useMemo(() => {
    return new GameClass(['a', 'b', 'c']);
  }, []);

  game.useReactive();

  const tree = game.players[0].render(game);

  return (
    <Container>
      <Moon />
      {Object.keys(tree).map(key => {
        const Component = components[key as keyof Components];

        return (
          <Component key={key} game={game} {...tree[key as keyof Components]} />
        );
      })}
    </Container>
  );
};
