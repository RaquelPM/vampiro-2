import React from 'react';

import { Component, ComponentData } from '~/game';

import { ConfirmBtn, Container } from './styles';

export type ButtonsData = ComponentData<{
  props: {
    enabled?: boolean;
    confirmText?: string;
    onConfirm?: () => void;
  };
}>;

export const Buttons: Component<'buttons'> = ({
  game,
  enabled = game.controllers.playersList.selectedIndex !== -1,
  confirmText = 'Prosseguir',
  onConfirm,
}) => {
  const onPress = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <Container>
      <ConfirmBtn size="large" enabled={enabled} onPress={onPress}>
        {confirmText}
      </ConfirmBtn>
    </Container>
  );
};
