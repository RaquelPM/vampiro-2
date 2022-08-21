import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GameProvider } from '~/contexts';
import { Announcements, Playing, Turn } from '~/pages/Game';
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
        <GameStack.Screen name="Announcements" component={Announcements} />
      </GameStack.Navigator>
    </GameProvider>
  );
};
