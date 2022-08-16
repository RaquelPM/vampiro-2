import React, { useEffect, useMemo } from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';

import { AsideLabel, Container, PlayerBtn, PlayerLabel } from './styles';

export type CardProps = {
  name: string;
  size: 'small' | 'large';
  selected: boolean;
  position: number;
  last: boolean;
  asideText: string | number;
  asideImage: React.FC<SvgProps> | null;
  enabled: boolean;
  onPress: () => void;
};

export const Card = ({
  name,
  size,
  selected,
  position,
  last,
  asideText,
  asideImage: Image,
  enabled,
  onPress,
}: CardProps) => {
  const { window, colors } = useTheme();

  const active = useSharedValue(enabled ? 1 : 0);

  const layout = useMemo(() => {
    const leftForOdd = size === 'small' && last ? window.width / 4 + 20 : 30;

    return {
      width: size === 'large' ? window.width - 60 : window.width / 2 - 40,
      top:
        size === 'large'
          ? position * 84 + 10
          : Math.floor(position / 2) * 84 + 10,
      left:
        size === 'small' && position % 2 === 1
          ? window.width / 2 + 10
          : leftForOdd,
    };
  }, [position, size]);

  const width = useSharedValue(layout.width);
  const top = useSharedValue(layout.top);
  const left = useSharedValue(layout.left);

  useEffect(() => {
    if (selected) {
      active.value = withTiming(2, { duration: 200 });

      return;
    }

    active.value = withTiming(enabled ? 1 : 0, {
      duration: 200,
    });
  }, [enabled, selected]);

  useEffect(() => {
    width.value = withTiming(layout.width, {
      duration: 300,
    });
    top.value = withTiming(layout.top, {
      duration: 300,
    });
    left.value = withTiming(layout.left, {
      duration: 300,
    });
  }, [size, position]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      top: top.value,
      left: left.value,
    };
  });

  const buttonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      active.value,
      [0, 1, 2],
      [colors.gray, 'white', colors.accent]
    ),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      active.value,
      [0, 1, 2],
      [colors.darkGray, 'black', 'white']
    ),
  }));

  return (
    <Container style={containerStyle}>
      {Image ? (
        <Image width={64} height={50} preserveAspectRatio="xMidYMid meet" />
      ) : (
        <AsideLabel variant="button">{asideText}</AsideLabel>
      )}
      <PlayerBtn
        style={buttonStyle}
        rippleColor="#9994"
        enabled={enabled}
        onPress={onPress}
      >
        <PlayerLabel style={textStyle}>{name}</PlayerLabel>
      </PlayerBtn>
    </Container>
  );
};
