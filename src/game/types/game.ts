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

export type Announcement = {
  title?: string;
  image?: FC<SvgProps>;
  object?: {
    name?: string;
    image?: FC<SvgProps>;
    alt?: string;
  };
};

export type GameVars = UnionToIntersection<
  ClassesVars[keyof ClassesVars]['game']
>;
