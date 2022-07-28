import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';

export type StylesProviderProps = {
  children?: ReactNode;
};

export const StylesProvider = ({ children }: StylesProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export * from './theme';
