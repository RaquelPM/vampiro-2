import React from 'react';
import { Pressable } from 'react-native';

import { Button } from '../Button';
import { Container, Content } from './styles';

export type AlertProps = {
  visible?: boolean;
  onConfirm?: () => void;
  children?: React.ReactNode;
};

export const Alert = ({ visible, onConfirm, children }: AlertProps) => {
  return (
    <Container visible={visible}>
      <Content>{children}</Content>
      <Pressable onPress={onConfirm}>
        <Button size="small">Ok</Button>
      </Pressable>
    </Container>
  );
};
