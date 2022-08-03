import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Typography } from '../Typography';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  background: ${p => p.theme.colors.primary};

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackBtn = styled(TouchableOpacity)`
  margin: 0 0 0 30px;
`;

export const BackIcon = styled(Icon)`
  color: white;
`;

export const Label = styled(Typography)`
  flex: 1;

  margin: 0 60px 0 0;

  text-align: center;
`;
