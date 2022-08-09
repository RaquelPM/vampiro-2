import { doctor } from './doctor';
import { seer } from './seer';
import { vampire } from './vampire';

export const classes = {
  doctor,
  seer,
  vampire,
};

export type Classes = typeof classes;

export type ClassKeys = keyof Classes;
