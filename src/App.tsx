import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';

import { ContextProvider } from './contexts';
import { Routes } from './routes';
import { ThemesProvider } from './styles';

export const App = () => {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);

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
