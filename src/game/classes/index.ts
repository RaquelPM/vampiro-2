import { Citizen, CitizenVars } from './citizen';
import { Doctor, DoctorVars } from './doctor';
import { Dracula, DraculaVars } from './dracula';
import { Seer, SeerVars } from './seer';
import { Vampire, VampireVars } from './vampire';

export type ClassesVars = {
  citizen: CitizenVars;
  doctor: DoctorVars;
  dracula: DraculaVars;
  seer: SeerVars;
  vampire: VampireVars;
};

export const classes = {
  citizen: Citizen,
  doctor: Doctor,
  dracula: Dracula,
  seer: Seer,
  vampire: Vampire,
};

export type Classes = typeof classes;

export type ClassKeys = keyof Classes;

export type { Player } from './createClass';
