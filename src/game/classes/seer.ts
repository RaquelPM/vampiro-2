import { seerImg } from '~/assets/classes';

import { createClass } from './createClass';

export type SeerProps = Record<string, never>;

export const Seer = createClass('seer', {
  preset: 'citizen',

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
