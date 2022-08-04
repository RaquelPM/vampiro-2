import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';

import { Typography } from '~/components';

export const Container = styled(Animated.createAnimatedComponent(Pressable))`
  align-self: center;

  margin: 10px 0;

  width: ${p => 0.75 * p.theme.window.width}px;
  height: 64px;
  overflow: hidden;

  align-items: center;
  justify-content: center;
`;

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const Wrapper = styled(AnimatedRectButton)`
  padding: 0 21px;

  width: 100%;
  height: 100%;
  min-width: 250px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  elevation: 10;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled(Typography)`
  color: black;
`;
