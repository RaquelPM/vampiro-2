import { Game } from '..';

export type GameComponent<T> = T & {
  game: Game;
};
