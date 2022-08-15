import { Dispatch, SetStateAction, useState } from 'react';

import { getRandomInteger } from '~/utils';

import type { Classes, ClassKeys, Player } from './classes';
import { classes } from './classes';
import { Actions, ClassesVars, GameVars } from './types';

export class Game {
  players: Player[];

  turn: number;

  vars: GameVars;

  private actionsOrigins: Record<keyof Actions, keyof ClassesVars>;

  private reactive: {
    selectedIndex: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
    selectedItem: number;
    setSelectedItem: Dispatch<SetStateAction<number>>;
  };

  constructor(players: string[]) {
    this.players = players.map(() => ({} as Player));
    this.turn = 0;
    this.vars = {} as GameVars;
    this.reactive = {} as any;
    this.actionsOrigins = {} as any;

    this.drawClasses(players);

    this.forEachClass(item => {
      item.setup(this);

      Object.keys(item.actions).forEach(key => {
        this.actionsOrigins[key as keyof Actions] = item.key;
      });

      this.forEachPlayer(player => {
        item.setupPlayer(player);
      });
    });
  }

  private drawClasses(players: string[]) {
    const keys = Object.keys(classes) as ClassKeys[];

    this.shuffledForEachPlayer((item, index) => {
      const random = getRandomInteger(0, keys.length);

      const [key] = keys.splice(random, 1);

      const Class = classes[key];

      this.players[index] = new Class({
        name: players[index],
        index,
      });
    });
  }

  private forEachClass(cb: (item: Classes[ClassKeys]) => void) {
    Object.values(classes).forEach(item => {
      cb(item);
    });
  }

  private shuffledForEachClass(cb: (item: Classes[ClassKeys]) => void) {
    const keys = Object.keys(classes) as ClassKeys[];

    while (keys.length > 0) {
      const random = getRandomInteger(0, keys.length);

      const [key] = keys.splice(random, 1);

      cb(classes[key]);
    }
  }

  private forEachPlayer(cb: (item: Player, index: number) => void) {
    this.players.forEach(cb);
  }

  private shuffledForEachPlayer(cb: (item: Player, index: number) => void) {
    const indexes = this.players.map((item, index) => index);

    while (indexes.length > 0) {
      const random = getRandomInteger(0, indexes.length);

      const [index] = indexes.splice(random, 1);

      cb(this.players[index], index);
    }
  }

  doAction<K extends keyof Actions>(key: K, ...params: Actions[K]['params']) {
    const origin = this.actionsOrigins[key];

    const action = (classes[origin].actions as any)[key];

    if (typeof action === 'function') {
      this.shuffledForEachClass(item => {
        const interceptor = item.interceptors[key];

        if (typeof interceptor === 'function') {
          params = interceptor(this, ...params);
        }
      });

      action(this, ...params);
    }
  }

  beforeEachNight() {
    this.shuffledForEachClass(item => item.beforeEachNight(this));
  }

  afterEachNight() {
    this.shuffledForEachClass(item => item.afterEachNight(this));
  }

  beforeEachDay() {
    this.shuffledForEachClass(item => item.beforeEachDay(this));
  }

  afterEachDay() {
    this.shuffledForEachClass(item => item.afterEachDay(this));
  }

  nextTurn() {
    const player = this.alivePlayers.find(item => item.index > this.turn);

    if (player) {
      this.turn = player.index;

      return this.turn;
    }

    return -1;
  }

  useReactive() {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedItem, setSelectedItem] = useState(-1);

    this.reactive = {
      selectedIndex,
      setSelectedIndex,
      selectedItem,
      setSelectedItem,
    };

    return { selectedIndex, setSelectedIndex };
  }

  get selectedIndex() {
    return this.reactive.selectedIndex;
  }

  set selectedIndex(value: number) {
    this.reactive.setSelectedIndex(value);
  }

  get selectedItem() {
    return this.reactive.selectedItem;
  }

  set selectedItem(value) {
    this.reactive.setSelectedItem(value);
  }

  get alivePlayers() {
    return this.players.filter(item => !item.dead);
  }

  get selectedPlayer() {
    return this.players[this.selectedIndex];
  }

  get currentPlayer() {
    return this.players[this.turn];
  }
}

export * from './classes';
export * from './components';
