import styled from 'styled-components/native';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Typography } from '~/components';

export const Container = styled(View)`
  margin: 10px 0;

  align-items: center;
`;

export type WrapperProps = {
  selected: boolean;
};

export const Button = styled(RectButton)`
  margin: 0 0 5px;

  width: 130px;
  height: 130px;
  background: white;
  border-radius: 100px;

  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled(View)<WrapperProps>`
  width: 100%;
  height: 100%;
  border-color: ${p => (p.selected ? p.theme.colors.pink : 'transparent')};
  border-radius: 100px;
  border-width: 5px;

  align-items: center;
  justify-content: center;
`;

export const Label = styled(Typography)``;
