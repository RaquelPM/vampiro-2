import styled from 'styled-components/native';
import { Pressable, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';

import { ModalBody, Typography } from '~/components';

export const Container = styled(ModalBody)`
  padding: 42px 40px;
`;

export const Label = styled(Typography)`
  color: ${p => p.theme.colors.dark};
  text-transform: uppercase;
`;

export const Input = styled(TextInput)`
  margin: 34px 40px;
  padding: 5px;

  width: 100%;
  height: 64px;
  border-bottom-width: 1px;

  color: black;
  text-align: center;
  font-size: 32px;
  font-family: 'Anton-Regular';
`;

export const ButtonsWrapper = styled(View)`
  height: 64px;

  flex-direction: row;
`;

export const ErasePressArea = styled(Pressable)`
  flex: 1;

  margin: 0 10px 0 0;
`;

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const EraseBtn = styled(AnimatedRectButton)`
  flex: 1;

  background: ${p => p.theme.colors.accent};
  border-radius: 5px;

  align-items: center;
  justify-content: center;
`;

export const ConfirmPressArea = styled(ErasePressArea)`
  margin: 0;
`;

export const ConfirmBtn = styled(EraseBtn)``;

export const ButtonLabel = styled(Typography)`
  color: white;
  text-transform: uppercase;
`;
