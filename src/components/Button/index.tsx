import React from 'react';
import { AnimateProps } from 'react-native-reanimated';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Label } from './styles';

export type ButtonProps = AnimateProps<RectButtonProps> & {
  children?: React.ReactNode;
  size?: 'regular' | 'large';
};

export const Button = ({
  children,
  size = 'regular',
  enabled = true,
  ...rest
}: ButtonProps) => {
  return (
    <Container
      size={size}
      enabled={enabled}
      testID="button-component"
      {...rest}
    >
      <Label enabled={!!enabled} variant="button">
        {children}
      </Label>
    </Container>
  );
};
