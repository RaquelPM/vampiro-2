import React from 'react';
import { AnimateProps } from 'react-native-reanimated';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Label } from './styles';

export type PrimaryButtonProps = AnimateProps<RectButtonProps> & {
  children?: string;
};

export const PrimaryButton = ({ children, ...rest }: PrimaryButtonProps) => {
  return (
    <Container {...rest}>
      <Label variant="button">{children}</Label>
    </Container>
  );
};
