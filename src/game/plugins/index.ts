import { VampireOutlineImg } from '~/assets/icons';

import { Game } from '..';
import { Components } from '../components';

export const vampirePlayersList = (
  game: Game,
  props: Components['playersList']
) => {
  const playerList: Components['playersList'] = {
    asideTextExtractor: item => String(game.vars.votesVamp[item.index]),
    asideImageExtractor: () => VampireOutlineImg,
    columnsStyle: 'single',
    ...props,
  };

  return playerList;
};
