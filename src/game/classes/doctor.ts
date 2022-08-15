import { doctorImg } from '~/assets/classes';

import { createClass } from './createClass';

export type DoctorProps = {
  vars: {
    protectedDoc: Set<number>;
  };
};

export const Doctor = createClass('doctor', {
  team: 'citizen',

  name: 'Médico',

  image: doctorImg,

  rules: {
    maxInstances: 2,
  },

  setupVars() {
    return {
      protectedDoc: new Set<number>(),
    };
  },

  beforeEachNight(game) {
    game.vars.protectedDoc.clear();
  },

  betweenNightAndDay(game) {
    const { killedVamp, protectedDoc } = game.vars;

    if (protectedDoc.has(killedVamp)) {
      game.vars.killedVamp = -1;
    }
  },

  render(game, player, done) {
    return {
      playerInfo: {
        instruction: 'Selecione alguém para proteger esta noite',
      },

      playersList: {},

      buttons: {
        onConfirm: () => {
          game.vars.protectedDoc.add(game.selectedIndex);

          done();
        },
      },
    };
  },
});
