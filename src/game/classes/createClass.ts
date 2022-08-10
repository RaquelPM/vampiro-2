import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import { Game } from '..';
import { Components } from '../components';

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

export type Player<T> = PlayerProps & {
  dead: boolean;
  local: T;
  class: ClassProps & {
    key: string;
  };
};

type ExtraProps = Record<string, unknown>;

export type EventFunction = (game: Game) => void;

export type CreateClassParams<
  S extends ExtraProps,
  P extends ExtraProps
> = ClassProps & {
  setup?: () => S;
  setupPlayer?: () => P;
  beforeEachNight?: EventFunction;
  afterEachNight?: EventFunction;
  betweenNightAndDay?: EventFunction;
  beforeEachDay?: EventFunction;
  afterEachDay?: EventFunction;
  betweenDayAndNight?: EventFunction;
  render: (
    game: Game,
    player: Player<P>
  ) => {
    playerInfo: {
      instruction: string;
    } & Partial<Omit<Components['playerInfo'], 'instruction'>>;
  } & Partial<Omit<Components, 'playerInfo'>>;
};

export function createClass<
  K extends string,
  S extends ExtraProps,
  P extends ExtraProps
>(key: K, { name, image, rules, ...methods }: CreateClassParams<S, P>) {
  return class Class implements Player<P> {
    static key = key;

    static displayName = name;

    static rules = rules;

    name: string;

    index: number;

    dead: boolean;

    local: P;

    class: ClassProps & {
      key: K;
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
      };
    }

    static setup(): S {
      if (methods.setup) {
        return methods.setup();
      }

      return {} as S;
    }

    static setupPlayer(): P {
      if (methods.setupPlayer) {
        return methods.setupPlayer();
      }

      return {} as P;
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

    render(
      game: Game
    ): Partial<Components> & { playerInfo: Components['playerInfo'] } {
      const tree = methods.render(game, this);

      return {
        ...tree,
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
