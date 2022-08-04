import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';

import { Header } from '~/components';
import { Home, More, Players } from '~/pages';
import { NavigationScreens } from '~/types';
import { navigateAnimation } from '~/utils';

export const Stack = createStackNavigator<NavigationScreens>();

export const Routes = () => {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          header: Header,
          headerShown: false,
          ...navigateAnimation,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="More" component={More} />
        <Stack.Screen
          name="Players"
          component={Players}
          options={{ headerShown: true, headerTitle: 'Jogadores' }}
        />
      </Stack.Navigator>
    </>
  );
};
