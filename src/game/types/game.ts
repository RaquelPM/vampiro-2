import { UnionToIntersection } from '~/types';

import { ClassesVars } from '.';

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

export type GameVars = UnionToIntersection<
  ClassesVars[keyof ClassesVars]['game']
>;
