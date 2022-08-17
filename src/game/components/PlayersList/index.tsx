import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';

import { VampireOutlineImg } from '~/assets/icons';
import { Component, ComponentController, ComponentData, Player } from '~/game';

import { Card } from './Card';
import { Container } from './styles';

export type PlayersListData = ComponentData<{
  props: {
    vampirePreset?: boolean;
    style?: 'basic' | 'with-aside';
    filter?: (item: Player) => boolean;
    enable?: (item: Player) => boolean;
    extractAsideTexts?: (item: Player) => string;
    extractAsideImages?: (item: Player) => React.FC<SvgProps> | null;
  };
  controller: {
    selectedIndex: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
    selectedPlayer: Player;
  };
}>;

export const usePlayersList: ComponentController<'playersList'> = game => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const selectedPlayer = useMemo(() => {
    return game.players[selectedIndex];
  }, [selectedIndex]);

  return {
    selectedIndex,
    setSelectedIndex,
    selectedPlayer,
  };
};

export const PlayersList: Component<'playersList'> = ({
  game,
  vampirePreset,
  style = vampirePreset ? 'with-aside' : 'basic',
  filter,
  enable,
  extractAsideTexts,
  extractAsideImages,
}) => {
  const { selectedIndex, setSelectedIndex } = game.controllers.playersList;

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
        return item.vars.votesVamp + (selectedIndex === item.index ? 1 : 0);
      }

      return '';
    });
  }, [selectedIndex, players, extractAsideTexts]);

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
    setSelectedIndex(index === selectedIndex ? -1 : index);
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
          selected={selectedIndex === item.index}
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
