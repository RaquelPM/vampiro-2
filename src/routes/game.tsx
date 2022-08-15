import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GameProvider } from '~/contexts';
import { Playing, Turn } from '~/pages/Game';
import { GameNavigationScreens } from '~/types';
import { navigateAnimation } from '~/utils';

export const GameStack = createStackNavigator<GameNavigationScreens>();

export const GameRoutes = () => {
  return (
    <GameProvider>
      <GameStack.Navigator
        screenOptions={{ headerShown: false, ...navigateAnimation }}
      >
        <GameStack.Screen name="Turn" component={Turn} />
        <GameStack.Screen name="Playing" component={Playing} />
      </GameStack.Navigator>
    </GameProvider>
  );
};
