import React from 'react';
import { BounceInUp } from 'react-native-reanimated';
import { StackScreenProps } from '@react-navigation/stack';

import Background from '~/assets/icons/night-background.svg';
import { NavigationScreens } from '~/types';

import { Container, InitBtn, Logo, LogoWrapper, MoreBtn } from './styles';

export type HomeProps = StackScreenProps<NavigationScreens, 'Home'>;

export const Home = ({ navigation }: HomeProps) => {
  return (
    <Container src={Background}>
      <LogoWrapper entering={BounceInUp.delay(1500).duration(1000)}>
        <Logo width="100%" height={170} preserveAspectRatio="xMidYMax meet" />
      </LogoWrapper>
      <InitBtn
        entering={BounceInUp.delay(1000).duration(1000)}
        onPress={() => navigation.navigate('Players')}
      >
        Jogar
      </InitBtn>
      <MoreBtn
        entering={BounceInUp.delay(500).duration(1000)}
        onPress={() => navigation.navigate('More')}
      >
        Mais
      </MoreBtn>
    </Container>
  );
};
