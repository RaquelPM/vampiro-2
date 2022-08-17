import { getRandomInteger } from '~/utils';

import { classes, Classes, ClassesVars, ClassKeys, Player } from './classes';
import { components, ComponentsData } from './components';
import { Actions, Announcement, GameVars } from './types';

export class Game {
  players: Player[];

  turn: number;

  vars: GameVars;

  controllers: {
    [Property in keyof ComponentsData]: ComponentsData[Property]['controller'] extends undefined
      ? Record<never, never>
      : ComponentsData[Property]['controller'];
  };

  announcements: Announcement[];

  private actionsOrigins: Record<keyof Actions, keyof ClassesVars>;

  constructor(players: string[]) {
    this.players = players.map(() => ({} as Player));
    this.turn = 0;
    this.announcements = [];
    this.vars = {} as GameVars;
    this.controllers = {} as any;
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

      const key = keys[random];

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

  useControllers() {
    Object.entries(components).forEach(([key, value]) => {
      const useController = value.controller;

      if (useController) {
        this.controllers[key as keyof ComponentsData] = useController(
          this
        ) as any;
      }
    });
  }

  get currentPlayer() {
    return this.players[this.turn];
  }

  get alivePlayers() {
    return this.players.filter(item => !item.dead);
  }
}

export * from './classes';
export * from './components';
export * from './types';
