import { seerImg } from '~/assets/classes';

import { createClass } from './createClass';

export const seer = createClass('seer', {
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
    };
  },
});
