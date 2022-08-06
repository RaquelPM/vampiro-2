import AsyncStorage from '@react-native-async-storage/async-storage';

export const storePlayers = (players: string[]) => {
  return AsyncStorage.setItem('vampiro@players', JSON.stringify(players));
};

export const getStoredPlayers = async () => {
  const stored = (await AsyncStorage.getItem('vampiro@players')) || '[]';

  return JSON.parse(stored) as string[];
};
