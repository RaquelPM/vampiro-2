import React, { useEffect, useState } from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Class } from '~/game';

import { Typography } from '~/components';

import { ContainerComponent, ButtonSmall, ButtonText } from './styles';
import { useTheme } from 'styled-components';

export type CardClassProps = {
  children?: React.ReactNode;
  role: Class;
  isActive: boolean;
  onChange: (value: boolean) => void;
};

export const CardClass = ({
  children,
  role,
  isActive,
  onChange,
}: CardClassProps) => {
  const [active, setActive] = useState(isActive);

  const { colors } = useTheme();

  const Image = role.image;

  useEffect(() => {
    onChange(active);
    if (active) {
      background.value = withTiming(1, { duration: 300 });
    } else {
      background.value = withTiming(0, { duration: 300 });
    }
  }, [active]);

  const background = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      background.value,
      [0, 1],
      [colors.gray, colors.primary]
    ),
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      background.value,
      [0, 1],
      [colors.accent, colors.darkPrimary]
    ),
  }));

  return (
    <ContainerComponent
      style={containerStyle}
      onTouchEnd={() => setActive(!active)}
    >
      <Typography>{role.displayName.toUpperCase()}</Typography>
      <Image height={100} width={'100%'} preserveAspectRatio="xMidYMid meet" />
      <ButtonSmall style={buttonStyle}>
        <ButtonText>{active ? 'Desativar' : 'Ativar'}</ButtonText>
      </ButtonSmall>
    </ContainerComponent>
  );
};
