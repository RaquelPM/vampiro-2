import React from 'react';
import { Modal, ViewProps } from 'react-native';

import { Body, Container, Overlay } from './styles';

export type ModalBodyProps = ViewProps & {
  visible?: boolean;
  onClose?: () => void;
};

export const ModalBody = ({
  children,
  visible = false,
  onClose,
  ...rest
}: ModalBodyProps) => {
  return (
    <>
      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
        animationType="none"
      >
        <Overlay />
      </Modal>
      <Modal
        visible={visible}
        onRequestClose={onClose}
        transparent
        animationType="slide"
      >
        <Container>
          <Body {...rest}>{children}</Body>
        </Container>
      </Modal>
    </>
  );
};
