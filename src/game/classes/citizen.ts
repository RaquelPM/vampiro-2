import { citizenImg } from '~/assets/classes';

import { createClass } from './createClass';

export type CitizenProps = Record<string, never>;

export const Citizen = createClass('citizen', {
  team: 'citizen',

  name: 'Cidadão',

  image: citizenImg,

  render() {
    return {
      playerInfo: {
        instruction: 'Você não pode fazer nada. Prossiga no jogo.',
      },

      buttons: {
        enabled: true,
      },
    };
  },
});
