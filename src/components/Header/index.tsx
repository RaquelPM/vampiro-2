import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';

import { Container, BackBtn, Label, BackIcon } from './styles';

export const Header = ({ options, route, navigation }: StackHeaderProps) => {
  if (!options.headerShown) {
    return false;
  }

  return (
    <Container>
      <BackBtn onPress={navigation.goBack}>
        <BackIcon name="arrow-back-circle-sharp" size={30} />
      </BackBtn>
      <Label variant="button">
        {typeof options.headerTitle === 'string'
          ? options.headerTitle
          : route.name}
      </Label>
    </Container>
  );
};
