import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Typography } from '../Typography';

export const Container = styled(View)`
  width: 100%;
  background: ${p => p.theme.colors.darkPrimary};

  align-items: center;
`;

export const ContentWrapper = styled(Animated.View)`
  width: 100%;
  overflow: hidden;

  align-items: center;
  justify-content: flex-end;
`;

export const Label = styled(Typography)`
  position: absolute;
  bottom: 0;

  padding: 13px 20px 0;

  text-align: center;
`;

export const InfoBtn = styled(TouchableOpacity)`
  margin: 9px 0;
`;
