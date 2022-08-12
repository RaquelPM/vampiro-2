import 'react-native-gesture-handler';

import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ContextProvider } from './contexts';
import { Routes } from './routes';
import { ThemesProvider } from './styles';

export const App = () => {
  LogBox.ignoreLogs([/Require cycle/g]);

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
