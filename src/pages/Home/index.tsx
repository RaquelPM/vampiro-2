import React from 'react';
import { BounceInUp } from 'react-native-reanimated';
import { StackScreenProps } from '@react-navigation/stack';

import Background from '~/assets/icons/night-background.svg';
import { NavigationProps } from '~/types';

import { Container, InitButton, Logo, LogoWrapper, MoreButton } from './styles';

export type HomeProps = StackScreenProps<NavigationProps, 'Home'>;

export const Home = ({ navigation }: HomeProps) => {
  return (
    <Container src={Background}>
      <LogoWrapper entering={BounceInUp.delay(1500).duration(1000)}>
        <Logo width="100%" height={170} preserveAspectRatio="xMidYMax meet" />
      </LogoWrapper>
      <InitButton entering={BounceInUp.delay(1000).duration(1000)}>
        Jogar
      </InitButton>
      <MoreButton
        entering={BounceInUp.delay(500).duration(1000)}
        onPress={() => navigation.navigate('More')}
      >
        Mais
      </MoreButton>
    </Container>
  );
};
