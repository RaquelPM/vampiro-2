import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { NavigationScreens } from '~/types';
import { Tutorial } from '~/components';
import { Class, classes } from '~/game';
import { CardClass } from './CardClass';
import { FlatList } from 'react-native-gesture-handler';

import { Container, NextBtn, CardsContainer } from './styles';

export type ClassesListScreenProps = StackScreenProps<
  NavigationScreens,
  'ClassesList'
>;

export const ClassesList = ({ navigation }: ClassesListScreenProps) => {
  const cardsList = Object.entries(classes).map(([key, classe]) => ({
    class: classe,
  }));

  return (
    <Container>
      <Tutorial>
        Selecione as classes que poderão ser sorteadas entre os jogadores. Você
        pode remover uma classe que acha muito roubada, por exemplo.
      </Tutorial>
      <CardsContainer>
        <FlatList
          data={cardsList}
          columnWrapperStyle={{
            marginLeft: '6%',
            marginRight: '10%',
          }}
          numColumns={2}
          renderItem={({ item }) => <CardClass classes={item.class} />}
          keyExtractor={item => item.class.key}
        />
      </CardsContainer>

      <NextBtn size="large">Prosseguir</NextBtn>
    </Container>
  );
};
