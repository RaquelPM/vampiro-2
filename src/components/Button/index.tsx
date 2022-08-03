import React from 'react';
import { AnimateProps } from 'react-native-reanimated';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Label } from './styles';

export type ButtonProps = AnimateProps<RectButtonProps> & {
  children?: string;
  size?: 'regular' | 'large';
};

export const Button = ({
  children,
  size = 'regular',
  ...rest
}: ButtonProps) => {
  return (
    <Container size={size} {...rest}>
      <Label variant="button">{children}</Label>
    </Container>
  );
};
