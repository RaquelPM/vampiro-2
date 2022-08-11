import { Buttons } from './Buttons';
import { PlayerInfo } from './PlayerInfo';
import { PlayerList } from './PlayersList';

export const components = {
  buttons: Buttons,
  playerInfo: PlayerInfo,
  playersList: PlayerList,
};

export type ComponentKeys = keyof typeof components;

export const componentsOrder: ComponentKeys[] = [
  'playerInfo',
  'playersList',
  'buttons',
];

export type Components = {
  [Property in ComponentKeys]: Omit<
    Parameters<typeof components[Property]>[0],
    'game'
  > | null;
};
