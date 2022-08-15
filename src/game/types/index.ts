import { UnionToIntersection } from '~/types';

import { ClassesProps as BaseClassesProps } from '../classes';
import {
  ButtonsProps,
  ItemProps,
  PlayerInfoProps,
  PlayerListProps,
} from '../components';

export type ClassesProps = {
  [Property in keyof BaseClassesProps]: {
    vars: BaseClassesProps[Property] extends { vars: any }
      ? BaseClassesProps[Property]['vars']
      : Record<never, never>;
    local: BaseClassesProps[Property] extends { local: any }
      ? BaseClassesProps[Property]['local']
      : Record<never, never>;
  };
};

export type Vars = UnionToIntersection<
  ClassesProps[keyof ClassesProps]['vars']
>;

export type ComponentsProps = {
  buttons: ButtonsProps;
  item: ItemProps;
  playerInfo: PlayerInfoProps;
  playersList: PlayerListProps;
};
