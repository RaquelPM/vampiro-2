import { doctorImg } from '~/assets/classes';

import { ClassVars } from '../types';
import { createClass } from './createClass';

export type DoctorVars = ClassVars<{
  player: {
    protectedDoc: boolean;
  };
}>;

export const Doctor = createClass('doctor', {
  team: 'citizen',

  name: 'Médico',

  image: doctorImg,

  rules: {
    maxInstances: 2,
  },

  beforeEachNight(game) {
    game.players.forEach(item => {
      item.vars.protectedDoc = false;
    });
  },

  render(game, player, done) {
    const { playersList } = game.controllers;

    return {
      playerInfo: {
        instruction: 'Selecione alguém para proteger esta noite',
      },

      playersList: {},

      buttons: {
        onConfirm: () => {
          playersList.selectedPlayer.vars.protectedDoc = true;

          done();
        },
      },
    };
  },

  interceptors: {
    killVamp(game, player) {
      if (player?.vars.protectedDoc) {
        return [null];
      }

      return [player];
    },
  },
});
