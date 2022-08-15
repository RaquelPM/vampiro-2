import React from 'react';
import { BounceInUp } from 'react-native-reanimated';
import { StackScreenProps } from '@react-navigation/stack';

import { MainBackground } from '~/assets/icons';
import { NavigationScreens } from '~/types';

import { Container, InitBtn, Logo, LogoWrapper, MoreBtn } from './styles';

export type HomeScreenProps = StackScreenProps<NavigationScreens, 'Home'>;

export const Home = ({ navigation }: HomeScreenProps) => {
  return (
    <Container src={MainBackground}>
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
