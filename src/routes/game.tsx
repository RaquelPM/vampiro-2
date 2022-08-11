import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GameProvider } from '~/contexts';
import { Playing } from '~/pages/Game';
import { GameNavigationScreens } from '~/types';

export const GameStack = createStackNavigator<GameNavigationScreens>();

export const GameRoutes = () => {
  return (
    <GameProvider>
      <GameStack.Navigator screenOptions={{ headerShown: false }}>
        <GameStack.Screen name="Playing" component={Playing} />
      </GameStack.Navigator>
    </GameProvider>
  );
};
