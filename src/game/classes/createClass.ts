import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import { Game } from '..';
import { ClassesProps, ComponentsProps } from '../types';

export type PlayerProps = {
  name: string;
  index: number;
};

export type ClassProps = {
  name: string;
  image: FC<SvgProps>;
  rules?: {
    maxInstances?: number;
    singleInstance?: boolean;
  };
};

export type BasePlayer = PlayerProps & {
  dead: boolean;
  class: ClassProps & {
    key: string;
    team: 'citizen' | 'vampire' | 'other';
  };
};

type Player<T> = BasePlayer & {
  local: T;
};

export type EventFunction = (game: Game) => void;

type Setup<T extends { [key: string]: () => any }> =
  T[keyof T] extends () => Record<never, never> ? Partial<T> : Required<T>;

export type CreateClassParams<K extends keyof ClassesProps> = ClassProps & {
  preset: 'citizen' | 'vampire' | 'other';
  beforeEachNight?: EventFunction;
  afterEachNight?: EventFunction;
  betweenNightAndDay?: EventFunction;
  beforeEachDay?: EventFunction;
  afterEachDay?: EventFunction;
  betweenDayAndNight?: EventFunction;
  render: (
    game: Game,
    player: Player<ClassesProps[K]['local']>,
    done: () => void
  ) => Partial<ComponentsProps>;
} & Setup<{ setupVars: () => ClassesProps[K]['vars'] }> &
  Setup<{ setupPlayer: () => ClassesProps[K]['local'] }>;

export function createClass<K extends keyof ClassesProps>(
  key: K,
  { name, image, rules, preset, ...methods }: CreateClassParams<K>
) {
  return class Class implements Player<ClassesProps[K]['local']> {
    static key = key;

    static displayName = name;

    static team = preset;

    static rules = rules;

    name: string;

    index: number;

    dead: boolean;

    local: ClassesProps[K]['local'];

    class: ClassProps & {
      key: K;
      team: typeof preset;
    };

    constructor(player: PlayerProps) {
      this.name = player.name;
      this.index = player.index;
      this.dead = false;

      this.local = Class.setupPlayer();

      this.class = {
        key,
        name,
        image,
        rules,
        team: preset,
      };
    }

    static setupVars() {
      if (methods.setupVars) {
        return methods.setupVars();
      }

      return {} as ClassesProps[K]['vars'];
    }

    static setupPlayer() {
      if (methods.setupPlayer) {
        return methods.setupPlayer();
      }

      return {} as ClassesProps[K]['local'];
    }

    static beforeEachNight(game: Game) {
      if (methods.beforeEachNight) {
        methods.beforeEachNight(game);
      }
    }

    static afterEachNight(game: Game) {
      if (methods.afterEachNight) {
        methods.afterEachNight(game);
      }
    }

    static betweenNightAndDay(game: Game) {
      if (methods.betweenNightAndDay) {
        methods.betweenNightAndDay(game);
      }
    }

    static beforeEachDay(game: Game) {
      if (methods.beforeEachDay) {
        methods.beforeEachDay(game);
      }
    }

    static afterEachDay(game: Game) {
      if (methods.afterEachDay) {
        methods.afterEachDay(game);
      }
    }

    static betweenDayAndNight(game: Game) {
      if (methods.betweenDayAndNight) {
        methods.betweenDayAndNight(game);
      }
    }

    render(game: Game, done: () => void): Partial<ComponentsProps> {
      const tree = methods.render(game, this, done);

      return {
        ...tree,
        buttons: {
          onConfirm: done,
          ...tree.buttons,
        },
        playerInfo: {
          classImg: this.class.image,
          playerName: this.name,
          className: this.class.name,
          ...tree.playerInfo,
        },
      };
    }
  };
}
