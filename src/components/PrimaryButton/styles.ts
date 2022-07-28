import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';

import { Typography } from '../Typography';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const Container = styled(AnimatedRectButton)`
  width: 75%;
  height: 64px;
  background: ${p => p.theme.colors.primary};
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  elevation: 5;

  align-items: center;
  justify-content: center;
`;

export const Label = styled(Typography)`
  text-align: center;
`;
