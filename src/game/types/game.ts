import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import { UnionToIntersection } from '~/types';

import { ClassesVars } from '../classes';

export type Actions = UnionToIntersection<
  {
    [key in keyof ClassesVars]: {
      [name in keyof ClassesVars[key]['actions']]: {
        params: Parameters<
          ClassesVars[key]['actions'][name] extends (...args: any[]) => void
            ? ClassesVars[key]['actions'][name]
            : never
        >;
      };
    };
  }[keyof ClassesVars]
>;

export type Announcement =
  | {
      style: 'regular';
      class: {
        title: string;
        image: FC<SvgProps>;
      };
      player: {
        name: string;
        class: string;
        image: FC<SvgProps>;
      };
    }
  | {
      style: 'only-class';
      title: string;
      image: FC<SvgProps>;
    }
  | {
      style: 'only-player';
      title: string;
      class: string;
      image: FC<SvgProps>;
    };

export type GameVars = UnionToIntersection<
  ClassesVars[keyof ClassesVars]['game']
>;
