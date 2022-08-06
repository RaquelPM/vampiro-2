import React from 'react';
import { render as baseRender } from '@testing-library/react-native';

import { ThemesProvider } from '~/styles';

export const render = (element: React.ReactNode) => {
  const tree = baseRender(<ThemesProvider>{element}</ThemesProvider>);

  return {
    ...tree,
    update: (el: React.ReactNode) =>
      tree.update(<ThemesProvider>{el}</ThemesProvider>),
  };
};
