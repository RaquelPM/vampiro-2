import { vampireImg } from '~/assets/classes';

import { createClass } from './createClass';

export type VampireProps = {
  vars: {
    killedVamp: number;
    votesVamp: number[];
  };
};

export const Vampire = createClass('vampire', {
  preset: 'vampire',

  name: 'Vampiro',

  image: vampireImg,

  setupVars() {
    return {
      killedVamp: -1,
      votesVamp: [],
    };
  },

  beforeEachNight(game) {
    game.vars.votesVamp = game.players.map(() => 0);
  },

  afterEachNight(game) {
    const { votesVamp } = game.vars;

    const maxVotes = votesVamp.reduce((acc, curr) => Math.max(acc, curr), 0);

    const playerIndex = votesVamp.findIndex(item => item === maxVotes);

    game.vars.killedVamp = playerIndex;
  },

  beforeEachDay(game) {
    const { killedVamp } = game.vars;

    if (killedVamp !== -1) {
      game.players[killedVamp].dead = true;
    }
  },

  render(game, player, done) {
    return {
      playerInfo: {
        instruction: 'Vote em alguém para morrer esta noite',
      },

      playersList: {
        vampirePreset: true,
      },

      buttons: {
        onConfirm: () => {
          game.vars.votesVamp[game.selectedIndex] += 1;

          done();
        },
      },
    };
  },
});
