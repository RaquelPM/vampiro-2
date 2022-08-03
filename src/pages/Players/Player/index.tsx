import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';

import { Container, Label, Wrapper } from './styles';

export type PlayerProps = {
  name: string;
  drag: () => void;
  isActive?: boolean;
};

export const Player = ({ name, drag, isActive }: PlayerProps) => {
  const { colors } = useTheme();

  return (
    <Container onLongPress={drag}>
      <Wrapper rippleColor="#9994">
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
