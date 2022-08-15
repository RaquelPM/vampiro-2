import { draculaImg } from '~/assets/classes';
import { draculaFangsImg } from '~/assets/items';

import { createClass } from './createClass';

export type DraculaProps = Record<string, never>;

export const Dracula = createClass('dracula', {
  team: 'vampire',

  name: 'Drácula',

  image: draculaImg,

  render(game) {
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
        style: game.selectedItem !== -1 ? 'basic' : 'with-aside',
      },
    };
  },
});
