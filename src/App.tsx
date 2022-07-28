import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './routes';
import { StylesProvider } from './styles';

export const App = () => {
  return (
    <NavigationContainer>
      <StylesProvider>
        <Routes />
      </StylesProvider>
    </NavigationContainer>
  );
};
