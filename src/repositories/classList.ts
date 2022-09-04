import AsyncStorage from '@react-native-async-storage/async-storage';
import { classActiveListType } from '~/types';

export const storeClassList = (classList: classActiveListType) => {
  return AsyncStorage.setItem('vampiro@classList', JSON.stringify(classList));
};

export const getStoredClassList = async () => {
  const stored = (await AsyncStorage.getItem('vampiro@classList')) || '{}';

  return JSON.parse(stored) as classActiveListType;
};
