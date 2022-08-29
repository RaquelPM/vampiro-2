import { Content } from './../../components/Alert/styles';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Button } from '~/components';

export const Container = styled(View)`
  width: 100%;
  height: 100%;

  background: ${p => p.theme.colors.dark};

  align-items: center;
  position: relative;
`;

export const NextBtn = styled(Button)`
  margin: 20px 0 27px;

  position: absolute;
  bottom: 0px;
`;

export const CardsContainer = styled(View)`
  margin-top: 20px;
  width: 100%;
  height: 80%;
`;
