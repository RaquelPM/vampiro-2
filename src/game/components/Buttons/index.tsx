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
  enabled = game.selectedPlayer !== -1,
  confirmText = 'Prosseguir',
  onConfirm,
}: GameComponent<ButtonsProps>) => {
  return (
    <Container>
      <ConfirmBtn enabled={enabled} onPress={onConfirm}>
        {confirmText}
      </ConfirmBtn>
    </Container>
  );
};
