import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { NightBackground } from '~/assets/icons';
import { useGame } from '~/hooks';
import { GameNavigationScreens } from '~/types';

import { Btn, Container, Name, Title } from './styles';

export type TurnScreenProps = StackScreenProps<GameNavigationScreens, 'Turn'>;

export const Turn = ({ navigation }: TurnScreenProps) => {
  const game = useGame();

  return (
    <Container src={NightBackground}>
      <Title>Vez de:</Title>
      <Name>{game.currentPlayer.name}</Name>
      <Btn onPress={() => navigation.replace('Playing')}>Pronto</Btn>
    </Container>
  );
};
