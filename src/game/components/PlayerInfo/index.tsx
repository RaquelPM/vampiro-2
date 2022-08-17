import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Component, ComponentData } from '~/game/types';

import { ClassName, Instruction, PlayerName } from './styles';

export type PlayerInfoData = ComponentData<{
  props: {
    classImg?: React.FC<SvgProps>;
    className?: string;
    playerName?: string;
    instruction?: string;
  };
}>;

export const PlayerInfo: Component<'playerInfo'> = ({
  classImg,
  className,
  playerName,
  instruction,
}) => {
  const Image = classImg;

  return (
    <>
      {Image && (
        <Image
          width={140}
          height={250}
          preserveAspectRatio="xMidYMax meet"
          style={{ marginTop: 29 }}
        />
      )}
      <PlayerName>{playerName}</PlayerName>
      <ClassName>{className}</ClassName>
      <Instruction>{instruction}</Instruction>
    </>
  );
};
