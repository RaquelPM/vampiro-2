import { Doctor } from './doctor';
import { Seer } from './seer';
import { Vampire } from './vampire';

export const classes = {
  doctor: Doctor,
  seer: Seer,
  vampire: Vampire,
};

export type Classes = typeof classes;

export type ClassKeys = keyof Classes;

export * from './createClass';
export * from './doctor';
export * from './seer';
export * from './vampire';
