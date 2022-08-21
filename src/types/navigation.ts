import { NavigatorScreenParams } from '@react-navigation/native';

export type GameNavigationScreens = {
  Announcements: undefined;
  Turn: undefined;
  Playing: undefined;
};

export type NavigationScreens = {
  Home: undefined;
  More: undefined;
  Players: undefined;
  Game: NavigatorScreenParams<GameNavigationScreens>;
};
