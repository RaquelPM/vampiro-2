import styled from 'styled-components/native';

import { Button, SvgBackground, Typography } from '~/components';

export const Container = styled(SvgBackground)`
  flex: 1;

  align-items: center;
`;

export const Title = styled(Typography)`
  margin: 140px 0 104px;

  font-size: 48px;
`;

export const Name = styled(Typography)`
  font-size: 32px;
`;

export const Btn = styled(Button)`
  margin: 25px 0 0;
`;
