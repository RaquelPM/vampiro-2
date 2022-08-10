import { vampireImg } from '~/assets/classes';

import { createClass } from './createClass';

export const vampire = createClass('vampire', {
  name: 'Vampiro',

  image: vampireImg,

  setup() {
    return {
      votesVamp: [] as number[],
      killedVamp: -1,
    };
  },

  beforeEachNight(game) {
    game.global.votesVamp = game.players.map(() => 0);
  },

  afterEachNight(game) {
    const { votesVamp } = game.global;

    const maxVotes = votesVamp.reduce((acc, curr) => Math.max(acc, curr), 0);

    const playerIndex = votesVamp.findIndex(item => item === maxVotes);

    game.global.killedVamp = playerIndex;
  },

  beforeEachDay(game) {
    const { killedVamp } = game.global;

    if (killedVamp !== -1) {
      game.players[killedVamp].dead = true;
    }
  },

  render(game) {
    return {
      playerInfo: {
        instruction: 'Vote em alguém para morrer esta noite',
      },
      playersList: {
        filter: item => game.selectedPlayer !== -1 || item.index > 0,
        columnsStyle: game.selectedPlayer !== -1 ? 'single' : 'double',
        asideTextExtractor: () => String(0),
      },
    };
  },
});
