import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';

import { Typography } from '~/components';

export const Container = styled(Animated.View)`
  position: absolute;

  height: 64px;
  background: ${p => p.theme.colors.pink};
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  elevation: 5;

  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const PlayerBtn = styled(AnimatedRectButton)`
  position: absolute;
  top: 0;
  left: 0;

  height: 64px;
  width: 100%;
  max-width: ${p => p.theme.window.width - 124}px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  elevation: 5;

  align-items: center;
  justify-content: center;
`;

export const PlayerLabel = styled(Typography)``;

export const AsideLabel = styled(Typography)`
  width: 64px;

  text-align: center;
`;
