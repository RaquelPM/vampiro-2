import { citizenImg } from '~/assets/classes';

import { ClassVars } from '../types';
import { createClass } from './createClass';

export type CitizenVars = ClassVars;

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
