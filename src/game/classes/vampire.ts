import { vampireImg } from '~/assets/classes';

import { ClassVars } from '../types';
import { createClass, Player } from './createClass';

export type VampireVars = ClassVars<{
  player: {
    votesVamp: number;
  };
  actions: {
    killVamp: (player: Player | null) => void;
  };
}>;

export const Vampire = createClass('vampire', {
  team: 'vampire',

  name: 'Vampiro',

  image: vampireImg,

  beforeEachNight(game) {
    game.players.forEach(item => {
      item.vars.votesVamp = 0;
    });
  },

  afterEachNight(game) {
    const maxVotes = game.players.reduce((acc, curr) => {
      return Math.max(acc, curr.vars.votesVamp);
    }, 0);

    const mostVoted = game.players.filter(item => {
      return item.vars.votesVamp === maxVotes;
    });

    if (mostVoted.length > 1) {
      game.doAction('killVamp', null);
    } else {
      game.doAction('killVamp', mostVoted[0]);
    }
  },

  render(game, player, done) {
    const { playersList } = game.controllers;

    return {
      playerInfo: {
        instruction: 'Vote em alguém para morrer esta noite',
      },

      playersList: {
        vampirePreset: true,
      },

      buttons: {
        onConfirm: () => {
          playersList.selectedPlayer.vars.votesVamp += 1;

          done();
        },
      },
    };
  },

  actions: {
    killVamp(game, player) {
      if (player) {
        player.dead = true;

        game.announcements.push({
          title: 'Os vampiros mataram:',
          image: vampireImg,
          object: {
            name: player.name,
            image: player.class.image,
            alt: player.class.name,
          },
        });
      } else {
        game.announcements.push({
          title: 'Os vampiros não mataram ninguém essa noite.',
          image: vampireImg,
        });
      }
    },
  },
});
