import React, { ComponentType, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { DraggableFlatListProps } from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { NavigationScreens } from '~/types';

import {
  NextBtn,
  Container,
  List,
  ListWrapper,
  AddBtn,
  AddLabel,
} from './styles';
import { Player } from './Player';

export type PlayersProps = StackScreenProps<NavigationScreens, 'Players'>;

type ListType = ComponentType<DraggableFlatListProps<string>>;

export const Players = () => {
  const [data, setData] = useState(['Adisson', 'B', 'C']);

  return (
    <Container>
      <ListWrapper>
        <List<ListType>
          data={data}
          renderItem={({ item, drag, isActive }) => (
            <Player name={item} drag={drag} isActive={isActive} />
          )}
          keyExtractor={(item, index) => String(index)}
          onDragEnd={value => setData(value.data)}
        />
      </ListWrapper>
      <AddBtn>
        <AddLabel>Adicionar Jogador</AddLabel>
        <Icon name="plus" color="white" size={20} />
      </AddBtn>
      <NextBtn size="large">Prosseguir</NextBtn>
    </Container>
  );
};
