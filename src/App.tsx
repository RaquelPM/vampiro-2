import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './routes';
import { ThemesProvider } from './styles';
import { ContextProvider } from './contexts';

export const App = () => {
  return (
    <NavigationContainer>
      <ThemesProvider>
        <ContextProvider>
          <Routes />
        </ContextProvider>
      </ThemesProvider>
    </NavigationContainer>
  );
};
