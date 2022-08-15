import { Citizen, CitizenProps } from './citizen';
import { Doctor, DoctorProps } from './doctor';
import { Dracula, DraculaProps } from './dracula';
import { Seer, SeerProps } from './seer';
import { Vampire, VampireProps } from './vampire';

export const classes = {
  citizen: Citizen,
  doctor: Doctor,
  dracula: Dracula,
  seer: Seer,
  vampire: Vampire,
};

export type Classes = typeof classes;

export type ClassesProps = {
  citizen: CitizenProps;
  doctor: DoctorProps;
  dracula: DraculaProps;
  seer: SeerProps;
  vampire: VampireProps;
};

export type ClassKeys = keyof Classes;

export * from './createClass';
export * from './citizen';
export * from './doctor';
export * from './seer';
export * from './vampire';
