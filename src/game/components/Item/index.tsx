import React, { Dispatch, SetStateAction, useState } from 'react';
import { SvgProps } from 'react-native-svg';

import { Component, ComponentController, ComponentData } from '~/game/types';

import { Button, Container, Label, Wrapper } from './styles';

export type ItemData = ComponentData<{
  props: {
    image?: React.FC<SvgProps>;
    label?: string;
  };
  controller: {
    selected: boolean;
    setSelected: Dispatch<SetStateAction<boolean>>;
  };
}>;

export const useItem: ComponentController<'item'> = () => {
  const [selected, setSelected] = useState(false);

  return {
    selected,
    setSelected,
  };
};

export const Item: Component<'item'> = ({ game, image, label = '' }) => {
  const { selected, setSelected } = game.controllers.item;

  const Image = image;

  const select = () => {
    setSelected(!selected);
  };

  return (
    <Container>
      <Button rippleColor="#4449" onPress={select}>
        <Wrapper selected={selected}>
          {Image && (
            <Image width={80} height={80} preserveAspectRatio="xMidYMid meet" />
          )}
        </Wrapper>
      </Button>
      <Label>{label}</Label>
    </Container>
  );
};
