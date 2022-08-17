import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import { UnionToIntersection } from '~/types';

import { Actions, ComponentsProps } from '../types';
import { Game } from '..';
import { ClassesVars } from '.';

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

type BaseInstance<K extends keyof ClassesVars> = PlayerProps & {
  dead: boolean;
  class: ClassProps & {
    key: K;
    team: 'citizen' | 'vampire' | 'other';
  };
  vars: UnionToIntersection<ClassesVars[keyof ClassesVars]['player']> &
    ClassesVars[K]['instance'];
  render(game: Game, done: () => void): ComponentsProps;
};

export type Player = {
  [Property in keyof ClassesVars]: BaseInstance<Property>;
}[keyof ClassesVars];

type EventFunction = (game: Game) => void;

type Interceptors = {
  [Property in keyof Actions]?: (
    game: Game,
    ...args: Actions[Property]['params']
  ) => Actions[Property]['params'];
};

export type CreateClassParams<K extends keyof ClassesVars> = ClassProps & {
  team: 'citizen' | 'vampire' | 'other';
  setup?: (game: Game) => void;
  setupPlayer?: (player: Player) => void;
  setupInstance?: (player: BaseInstance<K>) => void;
  beforeEachNight?: EventFunction;
  afterEachNight?: EventFunction;
  beforeEachDay?: EventFunction;
  afterEachDay?: EventFunction;
  render: (
    game: Game,
    player: BaseInstance<K>,
    done: () => void
  ) => Partial<ComponentsProps>;
  interceptors?: Interceptors;
} & (ClassesVars[K]['actions'] extends Record<string, (...args: any) => void>
    ? {
        actions: {
          [Property in keyof ClassesVars[K]['actions']]: ClassesVars[K]['actions'][Property] extends (
            ...args: infer A
          ) => void
            ? (game: Game, ...args: A) => void
            : never;
        };
      }
    : {
        actions?: undefined;
      });

export function createClass<K extends keyof ClassesVars>(
  key: K,
  {
    name,
    image,
    team,
    rules,
    actions,
    interceptors,
    ...methods
  }: CreateClassParams<K>
) {
  type Role = BaseInstance<K>;

  return class Class implements Role {
    static key = key;

    static displayName = name;

    static team = team;

    static rules = rules;

    static actions = actions || ({} as Record<never, never>);

    static interceptors = interceptors || ({} as Interceptors);

    name: string;

    index: number;

    dead: boolean;

    vars: Role['vars'];

    class: ClassProps & {
      key: K;
      team: typeof team;
    };

    constructor(player: PlayerProps) {
      this.name = player.name;
      this.index = player.index;
      this.dead = false;
      this.vars = {} as Role['vars'];

      this.class = {
        key,
        name,
        image,
        rules,
        team,
      };

      if (methods.setupInstance) {
        methods.setupInstance(this);
      }
    }

    static setup(game: Game) {
      if (methods.setup) {
        methods.setup(game);
      }
    }

    static setupPlayer(player: Player) {
      if (methods.setupPlayer) {
        methods.setupPlayer(player);
      }
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

    render(game: Game, done: () => void): ComponentsProps {
      const tree = methods.render(game, this, done);

      return {
        ...tree,
        buttons: {
          onConfirm: done,
          ...tree.buttons,
        },
        playerInfo: {
          classImg: this.class.image,
          className: this.class.name,
          playerName: this.name,
          ...tree.playerInfo,
        },
      };
    }
  };
}
