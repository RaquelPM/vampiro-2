import { draculaImg } from '~/assets/classes';
import { draculaFangsImg } from '~/assets/items';

import { ClassVars } from '../types';
import { createClass, Player } from './createClass';

export type DraculaVars = ClassVars<{
  game: {
    transformedDracula: number;
  };
  instance: {
    transformDracula: boolean;
  };
  actions: {
    transformDracula: (player: Player) => void;
  };
}>;

export const Dracula = createClass('dracula', {
  team: 'vampire',

  name: 'Drácula',

  image: draculaImg,

  setup(game) {
    game.vars.transformedDracula = -1;
  },

  setupInstance(player) {
    player.vars.transformDracula = true;
  },

  beforeEachNight(game) {
    const { transformedDracula } = game.vars;

    const player = game.players[transformedDracula];

    if (player) {
      game.doAction('transformDracula', player);
    }

    game.vars.transformedDracula = -1;
  },

  render(game, player, done) {
    const { item, playersList } = game.controllers;

    return {
      playerInfo: {
        instruction: 'Transforme algum jogador ou vote em alguém para matar:',
      },

      item: {
        image: draculaFangsImg,
        label: 'Transformar',
      },

      playersList: {
        vampirePreset: true,
        style: item.selected ? 'basic' : 'with-aside',
      },

      buttons: {
        onConfirm: () => {
          if (item.selected) {
            player.vars.transformDracula = false;

            game.vars.transformedDracula = playersList.selectedIndex;
          } else {
            playersList.selectedPlayer.vars.votesVamp += 1;
          }

          done();
        },
      },
    };
  },

  actions: {
    transformDracula(game, player) {
      player.class.key = 'vampire';
    },
  },

  interceptors: {
    killVamp(game, player) {
      const { transformedDracula } = game.vars;

      if (transformedDracula !== -1) {
        return [null];
      }

      return [player];
    },
  },
});
