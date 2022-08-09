import { createClass } from './createClass';

export const doctor = createClass('doctor', {
  name: 'Médico',

  rules: {
    maxInstances: 2,
  },

  setup() {
    return {
      protectedDoc: new Set<number>(),
    };
  },

  beforeEachNight(game) {
    game.global.protectedDoc.clear();
  },

  betweenNightAndDay(game) {
    const { killedVamp, protectedDoc } = game.global;

    if (protectedDoc.has(killedVamp)) {
      game.global.killedVamp = -1;
    }
  },
});
