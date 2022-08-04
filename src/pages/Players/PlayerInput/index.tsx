import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import {
  ButtonLabel,
  ButtonsWrapper,
  EraseBtn,
  ConfirmBtn,
  Container,
  Input,
  Label,
  ConfirmPressArea,
  ErasePressArea,
} from './styles';

export type PlayerInputProps = {
  visible: boolean;
  editName?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
  onDelete: () => void;
};

export const PlayerInput = ({
  visible,
  editName,
  onClose,
  onSubmit,
  onDelete,
}: PlayerInputProps) => {
  const [name, setName] = useState('');

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setName(editName || '');
  }, [visible]);

  return (
    <Container visible={visible} onClose={onClose}>
      <Label>{editName ? 'Editar jogador:' : 'Adicionar jogador:'}</Label>
      <Input
        ref={inputRef}
        value={name}
        onChangeText={setName}
        placeholder="Nome do jogador"
        placeholderTextColor="gray"
        maxLength={15}
        autoFocus
      />
      <ButtonsWrapper>
        {editName && (
          <ErasePressArea onPress={onDelete}>
            <EraseBtn>
              <ButtonLabel>Excluir</ButtonLabel>
            </EraseBtn>
          </ErasePressArea>
        )}
        <ConfirmPressArea onPress={() => onSubmit(name)}>
          <ConfirmBtn>
            <ButtonLabel variant={editName ? 'body' : 'button'}>
              Pronto
            </ButtonLabel>
          </ConfirmBtn>
        </ConfirmPressArea>
      </ButtonsWrapper>
    </Container>
  );
};
