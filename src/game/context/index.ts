import { getRandomInteger } from '~/utils';
import type { UnionToIntersection } from '~/types';

import type { Classes, ClassKeys } from '../classes';
import { classes } from '../classes';

export type Global = UnionToIntersection<
  ReturnType<Classes[ClassKeys]['setup']>
>;

export type Player = InstanceType<Classes[ClassKeys]>;

export class Game {
  players: Player[];

  global: Global;

  constructor(players: string[]) {
    this.players = players.map(() => ({} as Player));
    this.global = {} as Global;

    this.forEachClass(item => {
      this.global = {
        ...this.global,
        ...item.setup(),
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

  private shuffledForEachPlayer(cb: (item: Player, index: number) => void) {
    const indexes = this.players.map((item, index) => index);

    while (indexes.length > 0) {
      const random = getRandomInteger(0, indexes.length);

      const [index] = indexes.splice(random, 1);

      cb(this.players[index], index);
    }
  }

  beforeEachNight() {
    this.forEachClass(item => item.beforeEachNight(this));
  }

  afterEachNight() {
    this.forEachClass(item => item.afterEachNight(this));

    this.forEachClass(item => item.betweenNightAndDay(this));
  }

  beforeEachDay() {
    this.forEachClass(item => item.beforeEachDay(this));
  }

  afterEachDay() {
    this.forEachClass(item => item.afterEachDay(this));

    this.forEachClass(item => item.betweenDayAndNight(this));
  }
}
