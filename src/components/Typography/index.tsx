import React from 'react';
import { TextProps } from 'react-native';
import { AnimateProps } from 'react-native-reanimated';

import { Label } from './styles';

export type TypographyProps = AnimateProps<TextProps> & {
  variant?: 'title' | 'button' | 'body';
};

export const Typography = ({
  children,
  variant = 'body',
  ...rest
}: TypographyProps) => {
  return (
    <Label variant={variant} {...rest}>
      {children}
    </Label>
  );
};
