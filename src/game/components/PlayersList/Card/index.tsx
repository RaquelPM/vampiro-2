import React, { memo, useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components';

import { AsideLabel, Container, PlayerBtn, PlayerLabel } from './styles';

export type CardProps = {
  name: string;
  size: 'small' | 'large';
  selected: boolean;
  position: number;
  last: boolean;
  asideText?: string;
  onPress: () => void;
};

export const Card = memo(
  ({ name, size, selected, position, last, asideText, onPress }: CardProps) => {
    const { window } = useTheme();

    const width = useSharedValue(
      size === 'large' ? window.width - 60 : window.width / 2 - 40
    );
    const top = useSharedValue(0);
    const left = useSharedValue(0);

    useEffect(() => {
      const leftForOdd = size === 'small' && last ? window.width / 4 + 20 : 30;

      width.value = withTiming(
        size === 'large' ? window.width - 60 : window.width / 2 - 40,
        { duration: 300 }
      );
      top.value = withTiming(
        size === 'large'
          ? position * 84 + 10
          : Math.floor(position / 2) * 84 + 10
      );
      left.value = withTiming(
        size === 'small' && position % 2 === 1
          ? window.width / 2 + 10
          : leftForOdd,
        { duration: 300 }
      );
    }, [size, position]);

    const containerStyle = useAnimatedStyle(() => {
      return {
        width: width.value,
        top: top.value,
        left: left.value,
      };
    });

    return (
      <Container style={containerStyle}>
        <AsideLabel variant="button">{asideText}</AsideLabel>
        <PlayerBtn rippleColor="#9994" selected={selected} onPress={onPress}>
          <PlayerLabel selected={selected}>{name}</PlayerLabel>
        </PlayerBtn>
      </Container>
    );
  }
);
