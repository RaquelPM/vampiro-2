import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import LogoImg from '~/assets/icons/logo.svg';
import { Button, SvgBackground } from '~/components';

export const Container = styled(SvgBackground)`
  flex: 1;

  background: rgba(0, 0, 0, 0.5);

  align-items: center;
  justify-content: center;
`;

export const LogoWrapper = styled(Animated.View)`
  width: 100%;

  align-items: center;
`;

export const Logo = styled(LogoImg)`
  height: 20px;
`;

export const InitBtn = styled(Button)`
  margin: 34px 0 26px;
`;

export const MoreBtn = styled(Button)``;
