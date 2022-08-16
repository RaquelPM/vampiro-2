import styled from 'styled-components/native';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';

import { Typography } from '~/components';

export type ContainerProps = {
  index: number;
};

export const Container = styled(Animated.View)<ContainerProps>`
  position: absolute;
  align-self: center;

  width: 100%;
  height: 84px;

  align-items: center;
  justify-content: center;
`;

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const Wrapper = styled(AnimatedRectButton)`
  padding: 0 0 0 21px;

  width: 75%;
  height: 64px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgb(0, 0, 0, 0.25);
  elevation: 5;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled(Typography)`
  color: black;
`;

export const IconWrapper = styled(View)`
  width: 64px;
  height: 64px;
  border-left-width: 1px;
  border-left-color: gray;

  align-items: center;
  justify-content: center;
`;
