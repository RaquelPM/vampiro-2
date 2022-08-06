/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require  */
/* eslint-disable @typescript-eslint/no-var-requires */

import 'react-native';
import 'jest-styled-components';
import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
