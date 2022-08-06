import React from 'react';

import { LocalProvider } from './local';

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <LocalProvider>{children}</LocalProvider>;
};

export * from './local';
