import React, { useEffect } from 'react';
import {
  AnimateProps,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';

import { Container, Label } from './styles';

export type ButtonProps = AnimateProps<RectButtonProps> & {
  children?: React.ReactNode;
  size?: 'regular' | 'large';
};

export const Button = ({
  children,
  size = 'regular',
  enabled = true,
  style,
  ...rest
}: ButtonProps) => {
  const { colors } = useTheme();

  const active = useSharedValue(enabled ? 1 : 0);

  useEffect(() => {
    active.value = withTiming(enabled ? 1 : 0, { duration: 200 });
  }, [enabled]);

  const buttonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      active.value,
      [0, 1],
      [colors.gray, colors.primary]
    ),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(active.value, [0, 1], [colors.darkGray, 'white']),
  }));

  return (
    <Container
      size={size}
      enabled={enabled}
      testID="button-component"
      style={[buttonStyle, style]}
      {...rest}
    >
      <Label enabled={!!enabled} variant="button" style={textStyle}>
        {children}
      </Label>
    </Container>
  );
};
