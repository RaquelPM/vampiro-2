import React, { useEffect, useMemo } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';

import { VampireOutlineImg } from '~/assets/icons';
import { Player } from '~/game';

import { GameComponent } from '../base';
import { Card } from './Card';
import { Container } from './styles';

export type PlayerListProps = {
  vampirePreset?: boolean;
  style?: 'basic' | 'with-aside';
  filter?: (item: Player) => boolean;
  enable?: (item: Player) => boolean;
  extractAsideTexts?: (item: Player) => string;
  extractAsideImages?: (item: Player) => React.FC<SvgProps> | null;
};

export const PlayerList = ({
  game,
  vampirePreset,
  style = vampirePreset ? 'with-aside' : 'basic',
  filter,
  enable,
  extractAsideTexts,
  extractAsideImages,
}: GameComponent<PlayerListProps>) => {
  const players = useMemo(() => {
    return game.players.filter(item => {
      if (item.dead) {
        return false;
      }

      if (item.index === game.turn) {
        return false;
      }

      return !filter || filter(item);
    });
  }, [game.players, filter]);

  const isEnabled = useMemo(() => {
    return players.map(item => {
      if (enable) {
        return enable(item);
      }

      if (vampirePreset) {
        return item.class.team !== 'vampire';
      }

      return true;
    });
  }, [players, enable]);

  const texts = useMemo(() => {
    return players.map(item => {
      if (extractAsideTexts) {
        return extractAsideTexts(item);
      }

      if (vampirePreset) {
        return (
          item.vars.votesVamp + (game.selectedIndex === item.index ? 1 : 0)
        );
      }

      return '';
    });
  }, [game.selectedIndex, players, extractAsideTexts]);

  const images = useMemo(() => {
    return players.map(item => {
      if (extractAsideImages) {
        return extractAsideImages(item);
      }

      if (vampirePreset) {
        return item.class.team === 'vampire' ? VampireOutlineImg : null;
      }

      return null;
    });
  }, [players]);

  const height = useSharedValue(
    style === 'with-aside'
      ? players.length * 84
      : Math.ceil(players.length / 2) * 84
  );

  const selectPlayer = (index: number) => {
    game.selectedIndex = index === game.selectedIndex ? -1 : index;
  };

  const containerStyle = useAnimatedStyle(() => ({
    minHeight: height.value,
  }));

  useEffect(() => {
    height.value = withTiming(
      style === 'with-aside'
        ? players.length * 84
        : Math.ceil(players.length / 2) * 84,
      { duration: 300 }
    );
  }, [style]);

  return (
    <Container style={containerStyle}>
      {players.map((item, index) => (
        <Card
          key={item.index}
          name={item.name}
          selected={game.selectedIndex === item.index}
          position={index}
          last={index === players.length - 1}
          size={style === 'with-aside' ? 'large' : 'small'}
          asideText={texts[index]}
          asideImage={images[index]}
          enabled={isEnabled[index]}
          onPress={() => selectPlayer(item.index)}
        />
      ))}
    </Container>
  );
};
