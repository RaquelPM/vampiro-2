import styled from 'styled-components/native';
import { View } from 'react-native';

import { Button } from '~/components';

export const Container = styled(View)`
  padding: 14px 20px 42px;

  width: 100%;

  flex-direction: row;
  justify-content: center;
`;

export const ConfirmBtn = styled(Button)`
  width: ${p => p.theme.window.width - 60}px;
`;
