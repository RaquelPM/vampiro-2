import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, More } from '~/pages';
import { NavigationProps } from '~/types';

export const Stack = createStackNavigator<NavigationProps>();

export const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
};
