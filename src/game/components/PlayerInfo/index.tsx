import React from 'react';
import { SvgProps } from 'react-native-svg';

import { GameComponent } from '../base';
import { ClassName, Instruction, PlayerName } from './styles';

export type PlayerInfoProps = {
  classImg?: React.FC<SvgProps>;
  className?: string;
  playerName?: string;
  instruction?: string;
};

export const PlayerInfo = ({
  game,
  classImg = game.currentPlayer.class.image,
  className = game.currentPlayer.class.name,
  playerName = game.currentPlayer.name,
  instruction,
}: GameComponent<PlayerInfoProps>) => {
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
