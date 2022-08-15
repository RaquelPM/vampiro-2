import React from 'react';
import { SvgProps } from 'react-native-svg';

import { GameComponent } from '../base';
import { Button, Container, Label, Wrapper } from './styles';

export type ItemProps = {
  image?: React.FC<SvgProps>;
  label?: string;
};

export const Item = ({ game, image, label = '' }: GameComponent<ItemProps>) => {
  const Image = image;

  const select = () => {
    game.selectedItem = game.selectedItem === -1 ? 0 : -1;
  };

  return (
    <Container>
      <Button rippleColor="#4449" onPress={select}>
        <Wrapper selected={game.selectedItem !== -1}>
          {Image && (
            <Image width={80} height={80} preserveAspectRatio="xMidYMid meet" />
          )}
        </Wrapper>
      </Button>
      <Label>{label}</Label>
    </Container>
  );
};
