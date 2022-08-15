import { Dispatch, SetStateAction, useState } from 'react';

import { getRandomInteger } from '~/utils';

import type { Classes, ClassKeys } from './classes';
import { classes } from './classes';
import { Vars } from './types';

export type Player = InstanceType<Classes[ClassKeys]>;

export class Game {
  players: Player[];

  turn: number;

  vars: Vars;

  private reactive: {
    selectedIndex: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
    selectedItem: number;
    setSelectedItem: Dispatch<SetStateAction<number>>;
  };

  constructor(
    players: string[],
    private listeners: {
      onNextTurn?: (turn: number) => void;
    } = {}
  ) {
    this.players = players.map(() => ({} as Player));
    this.turn = 0;
    this.vars = {} as Vars;
    this.reactive = {} as any;

    this.forEachClass(item => {
      this.vars = {
        ...this.vars,
        ...item.setupVars(),
      };
    });

    this.drawClasses(players);
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

  private shuffledForEachPlayer(cb: (item: Player, index: number) => void) {
    const indexes = this.players.map((item, index) => index);

    while (indexes.length > 0) {
      const random = getRandomInteger(0, indexes.length);

      const [index] = indexes.splice(random, 1);

      cb(this.players[index], index);
    }
  }

  beforeEachNight() {
    this.shuffledForEachClass(item => item.beforeEachNight(this));
  }

  afterEachNight() {
    this.shuffledForEachClass(item => item.afterEachNight(this));

    this.shuffledForEachClass(item => item.betweenNightAndDay(this));
  }

  beforeEachDay() {
    this.shuffledForEachClass(item => item.beforeEachDay(this));
  }

  afterEachDay() {
    this.shuffledForEachClass(item => item.afterEachDay(this));

    this.shuffledForEachClass(item => item.betweenDayAndNight(this));
  }

  nextTurn() {
    const turn = this.players.findIndex(
      item => item.index > this.turn && !item.dead
    );

    if (turn !== -1) {
      this.turn = turn;

      if (this.listeners.onNextTurn) {
        this.listeners.onNextTurn(turn);
      }
    }
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

  get selectedPlayer() {
    return this.players[this.selectedIndex];
  }

  get currentPlayer() {
    return this.players[this.turn];
  }
}

export * from './classes';
export * from './components';
