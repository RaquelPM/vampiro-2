import React from 'react';
import { Keyframe, Layout } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';

import { Container, Label, Wrapper } from './styles';

export type PlayerProps = {
  id: number;
  name: string;
  drag: () => void;
  isActive?: boolean;
  onPress?: () => void;
};

export const Player = ({ id, name, drag, isActive, onPress }: PlayerProps) => {
  const { colors } = useTheme();

  const outStyle = {
    opacity: 0,
    transform: [
      {
        translateX: 150 * (id % 2 === 0 ? -1 : 1),
      },
    ],
  };

  const inStyle = {
    opacity: 1,
    transform: [
      {
        translateX: 0,
      },
    ],
  };

  const entering = new Keyframe({
    from: outStyle,
    to: inStyle,
  }).duration(300);

  const exiting = new Keyframe({
    from: inStyle,
    to: outStyle,
  }).duration(300);

  return (
    <Container
      onLongPress={drag}
      entering={entering}
      exiting={exiting}
      layout={Layout.duration(500)}
    >
      <Wrapper rippleColor="#9994" onPress={onPress}>
        <Label>{name}</Label>
        <Icon
          name="menu"
          color={isActive ? colors.primary : 'gray'}
          size={20}
        />
      </Wrapper>
    </Container>
  );
};
