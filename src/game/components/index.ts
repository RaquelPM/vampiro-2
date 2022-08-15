import { Buttons } from './Buttons';
import { Item } from './Item';
import { PlayerInfo } from './PlayerInfo';
import { PlayerList } from './PlayersList';

export const components = {
  buttons: Buttons,
  item: Item,
  playerInfo: PlayerInfo,
  playersList: PlayerList,
};

export type ComponentKeys = keyof typeof components;

export const componentsOrder: ComponentKeys[] = [
  'playerInfo',
  'item',
  'playersList',
  'buttons',
];

export * from './Buttons';
export * from './Item';
export * from './PlayerInfo';
export * from './PlayersList';
