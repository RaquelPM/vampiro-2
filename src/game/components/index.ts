import { Component, ComponentController } from '../types';
import { Buttons, ButtonsData } from './Buttons';
import { Item, ItemData, useItem } from './Item';
import { PlayerInfo, PlayerInfoData } from './PlayerInfo';
import { PlayersList, PlayersListData, usePlayersList } from './PlayersList';

export type ComponentsData = {
  buttons: ButtonsData;
  item: ItemData;
  playerInfo: PlayerInfoData;
  playersList: PlayersListData;
};

type Components = {
  [Property in keyof ComponentsData]: {
    component: Component<Property>;
  } & (ComponentController<Property> extends undefined
    ? {
        controller?: undefined;
      }
    : {
        controller: ComponentController<Property>;
      });
};

export const components: Components = {
  buttons: {
    component: Buttons,
  },
  item: {
    component: Item,
    controller: useItem,
  },
  playerInfo: {
    component: PlayerInfo,
  },
  playersList: {
    component: PlayersList,
    controller: usePlayersList,
  },
};

export type ComponentKeys = keyof ComponentsData;

export const componentsOrder: ComponentKeys[] = [
  'playerInfo',
  'item',
  'playersList',
  'buttons',
];
