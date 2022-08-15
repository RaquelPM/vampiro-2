import { seerImg } from '~/assets/classes';

import { ClassVars } from '../types';
import { createClass } from './createClass';

export type SeerVars = ClassVars;

export const Seer = createClass('seer', {
  team: 'citizen',

  name: 'Vidente',

  image: seerImg,

  rules: {
    maxInstances: 1,
  },

  render() {
    return {
      playerInfo: {
        instruction: 'Selecione alguém para ver sua classe',
      },

      playersList: {},
    };
  },
});
