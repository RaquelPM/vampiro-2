import { Typography } from './../../../components/Typography/index';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const ContainerComponent = styled(Animated.View)`
  height: 200px;
  width: 44%;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 15px 0px;
  margin: 0 4% 8% 4%;
`;

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const ButtonSmall = styled(AnimatedRectButton)`
  margin: 15px 0px;
  padding: 3px 14px;
  border-radius: 3px;
`;

export const ButtonText = styled(Typography)`
  font-size: 14px;
`;
