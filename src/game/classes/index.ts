import { Citizen } from './citizen';
import { Doctor } from './doctor';
import { Dracula } from './dracula';
import { Seer } from './seer';
import { Vampire } from './vampire';

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
