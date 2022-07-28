import React from 'react';
import { TextProps } from 'react-native';

import { Label } from './styles';

export type TypographyProps = TextProps & {
  children?: string;
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
