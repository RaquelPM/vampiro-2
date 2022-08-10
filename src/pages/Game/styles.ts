import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

import { MoonImg } from '~/assets/icons';

const containerAttrs = () => ({
  contentContainerStyle: {
    width: '100%',
    minHeight: '100%',
    alignItems: 'center',
  },
});

export const Container = styled(ScrollView).attrs(containerAttrs)`
  flex: 1;

  background: ${p => p.theme.colors.dark};
`;

export const Moon = styled(MoonImg)`
  position: absolute;
  top: 42px;
  right: 24px;
`;
