import { UnionToIntersection } from '~/types';

import { DoctorProps, SeerProps, VampireProps } from '../classes';
import { ButtonsProps, PlayerInfoProps, PlayerListProps } from '../components';

type BaseClassesProps = {
  doctor: DoctorProps;
  seer: SeerProps;
  vampire: VampireProps;
};

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
  playerInfo: PlayerInfoProps;
  playersList: PlayerListProps;
};
