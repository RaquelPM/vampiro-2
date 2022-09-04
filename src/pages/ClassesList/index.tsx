import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { classActiveListType, NavigationScreens } from '~/types';
import { Tutorial } from '~/components';
import { Class, classes, ClassKeys } from '~/game';
import { CardClass } from './CardClass';
import { FlatList } from 'react-native-gesture-handler';

import { Container, NextBtn, CardsContainer } from './styles';
import { useLocal } from '~/hooks';

export type ClassesListScreenProps = StackScreenProps<
  NavigationScreens,
  'ClassesList'
>;

export const ClassesList = ({ navigation }: ClassesListScreenProps) => {
  const { classList, saveClassList } = useLocal();

  const classActiveList = useRef<classActiveListType>(classList);

  const onGoToNext = () => {
    saveClassList(classActiveList.current);
  };

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
          renderItem={({ item }) => (
            <CardClass
              role={item.class}
              isActive={!!classActiveList.current[item.class.key]}
              onChange={value =>
                (classActiveList.current[item.class.key] = value)
              }
            />
          )}
          keyExtractor={item => item.class.key}
        />
      </CardsContainer>

      <NextBtn size="large" onPress={onGoToNext}>
        Prosseguir
      </NextBtn>
    </Container>
  );
};
