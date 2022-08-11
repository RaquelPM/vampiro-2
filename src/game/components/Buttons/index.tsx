import React from 'react';

import { GameComponent } from '../base';
import { ConfirmBtn, Container } from './styles';

export type ButtonsProps = {
  enabled?: boolean;
  confirmText?: string;
  onConfirm?: () => void;
};

export const Buttons = ({
  game,
  enabled = game.selectedIndex !== -1,
  confirmText = 'Prosseguir',
  onConfirm,
}: GameComponent<ButtonsProps>) => {
  const onPress = () => {
    if (onConfirm) {
      onConfirm();
    }

    game.nextTurn();

    game.selectedIndex = -1;
  };

  return (
    <Container>
      <ConfirmBtn enabled={enabled} onPress={onPress}>
        {confirmText}
      </ConfirmBtn>
    </Container>
  );
};
