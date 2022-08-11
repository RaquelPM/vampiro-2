import React, { useEffect, useMemo } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';

import { Player } from '~/game/classes';

import { GameComponent } from '../base';
import { Card } from './Card';
import { Container } from './styles';

export type PlayerListProps = {
  filter?: (item: Player<Record<never, never>>, index: number) => boolean;
  columnsStyle?: 'single' | 'double';
  asideTextExtractor?: (
    item: Player<Record<never, never>>,
    index: number
  ) => string;
  asideImageExtractor?: (
    item: Player<Record<never, never>>,
    index: number
  ) => React.FC<SvgProps> | null;
};

export const PlayerList = ({
  game,
  filter,
  columnsStyle = 'double',
  asideTextExtractor,
  asideImageExtractor,
}: GameComponent<PlayerListProps>) => {
  const height = useSharedValue(0);

  const players = useMemo(() => {
    return game.players.filter(
      (item, index) => !item.dead && (!filter || filter(item, index))
    );
  }, [game.players]);

  const images = useMemo(() => {
    return players.map(
      (item, index) => asideImageExtractor && asideImageExtractor(item, index)
    );
  }, [players]);

  const selectPlayer = (index: number) => {
    game.selectedIndex = index === game.selectedIndex ? -1 : index;
  };

  const containerStyle = useAnimatedStyle(() => ({
    minHeight: height.value,
  }));

  useEffect(() => {
    height.value = withTiming(
      columnsStyle === 'single'
        ? players.length * 84
        : Math.ceil(players.length / 2) * 84,
      { duration: 300 }
    );
  }, [columnsStyle]);

  return (
    <Container style={containerStyle}>
      {players.map((item, index) => (
        <Card
          key={item.index}
          name={item.name}
          selected={game.selectedIndex === item.index}
          position={index}
          last={index === game.players.length - 1}
          size={columnsStyle === 'single' ? 'large' : 'small'}
          asideText={asideTextExtractor && asideTextExtractor(item, index)}
          asideImage={images[index]}
          onPress={() => selectPlayer(item.index)}
        />
      ))}
    </Container>
  );
};
