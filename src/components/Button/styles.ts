import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';

import { Typography } from '../Typography';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export type ContainerProps = {
  size: 'regular' | 'large';
};

const buttonWidth = ({ size }: ContainerProps) => {
  if (size === 'regular') {
    return css`
      width: ${p => 0.75 * p.theme.window.width}px;
      min-width: 250px;
    `;
  }

  return css`
    width: ${p => p.theme.window.width - 40}px;
  `;
};

export const Container = styled(AnimatedRectButton)<ContainerProps>`
  ${buttonWidth};
  height: 64px;
  background: ${p =>
    p.enabled ? p.theme.colors.primary : p.theme.colors.gray};
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  elevation: 5;

  align-items: center;
  justify-content: center;
`;

export type LabelProps = {
  enabled: boolean;
};

export const Label = styled(Typography)<LabelProps>`
  color: ${p => (p.enabled ? 'white' : p.theme.colors.darkGray)};
  text-align: center;
`;
