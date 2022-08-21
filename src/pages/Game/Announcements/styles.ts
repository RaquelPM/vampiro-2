import styled from 'styled-components';
import { ScrollView, View } from 'react-native';

import { SunImg } from '~/assets/icons';
import { Button, Typography } from '~/components';

const containerAttrs = () => ({
  contentContainerStyle: {
    alignItems: 'center',
    width: '100%',
    minHeight: '100%',
  },
});

export const Container = styled(ScrollView).attrs(containerAttrs)`
  flex: 1;

  background: ${p => p.theme.colors.light};
`;

export const Sun = styled(SunImg)`
  margin: 20px 0;
`;

export const InfoWrapper = styled(View)`
  flex: 1;

  width: 100%;

  align-items: center;
`;

export type HeadProps = {
  column: boolean;
};

export const Head = styled(View)<HeadProps>`
  width: 100%;

  flex-direction: ${p => (p.column ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
`;

export type HeadTitleProps = {
  single: boolean;
};

export const HeadTitle = styled(Typography)<HeadTitleProps>`
  flex: 1;

  margin: 0 0 0 ${p => (p.single ? 0 : 20)}px;

  max-width: ${p => (p.single ? '95%' : '170px')};

  font-size: 32px;
  text-align: center;
`;

export const BodyTitle = styled(Typography)`
  font-size: 32px;
`;

export const BodySmall = styled(Typography)`
  font-size: 18px;
`;

export const NextBtn = styled(Button)`
  margin: 20px 0 42px;
`;
