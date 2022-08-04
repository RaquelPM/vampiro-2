import styled from 'styled-components/native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { RectButton } from 'react-native-gesture-handler';

import { Button, Typography } from '~/components';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background: ${p => p.theme.colors.dark};

  align-items: center;
`;

export const ListWrapper = styled.View`
  flex: 1;

  padding: 10px 0;

  width: 100%;
`;

const containerAttrs = () => ({
  contentContainerStyle: {
    flex: 1,
  },
});

export const List = styled(DraggableFlatList).attrs(containerAttrs)`
  width: 100%;
  height: 100%;
`;

export const EmptyListLabel = styled(Typography)`
  flex: 1;

  color: white;
  text-align: center;
`;

export const AddBtn = styled(RectButton)`
  padding: 0 21px;

  width: ${p => 0.75 * p.theme.window.width}px;
  min-width: 250px;
  height: 64px;
  background: ${p => p.theme.colors.accent};
  border-radius: 5px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AddLabel = styled(Typography)`
  color: white;
  text-transform: uppercase;
`;

export const NextBtn = styled(Button)`
  margin: 20px 0 27px;
`;
