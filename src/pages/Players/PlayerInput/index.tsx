import React, { useEffect, useMemo, useState } from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components';

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
  const { colors } = useTheme();

  const [name, setName] = useState('');

  const active = useSharedValue(name.trim().length > 0 ? 1 : 0);

  const enabled = useMemo(() => {
    return name.trim().length > 0;
  }, [name]);

  useEffect(() => {
    setName(editName || '');
  }, [visible]);

  useEffect(() => {
    active.value = withTiming(enabled ? 1 : 0, { duration: 200 });
  }, [enabled]);

  const confirmStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      active.value,
      [0, 1],
      [colors.gray, colors.primary]
    ),
  }));

  const confirmTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(active.value, [0, 1], [colors.darkGray, 'white']),
  }));

  return (
    <Container visible={visible} onClose={onClose}>
      <Label>{editName ? 'Editar jogador:' : 'Adicionar jogador:'}</Label>
      <Input
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
        <ConfirmPressArea
          disabled={!enabled}
          onPress={() => onSubmit(name.trim())}
        >
          <ConfirmBtn style={confirmStyle} enabled={enabled}>
            <ButtonLabel
              style={confirmTextStyle}
              variant={editName ? 'body' : 'button'}
            >
              Pronto
            </ButtonLabel>
          </ConfirmBtn>
        </ConfirmPressArea>
      </ButtonsWrapper>
    </Container>
  );
};
