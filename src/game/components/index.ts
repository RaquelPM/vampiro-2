import { PlayerInfo } from './PlayerInfo';
import { PlayerList } from './PlayersList';

export const components = {
  playerInfo: PlayerInfo,
  playersList: PlayerList,
};

export type ComponentKeys = keyof typeof components;

export type Components = {
  [Property in ComponentKeys]: Omit<
    Parameters<typeof components[Property]>[0],
    'game'
  >;
};
