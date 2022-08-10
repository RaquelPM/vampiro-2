import React from 'react';
import { SvgProps } from 'react-native-svg';

import { GameComponent } from '../base';
import { ClassName, Instruction, PlayerName } from './styles';

export type PLayerInfoProps = {
  classImg?: React.FC<SvgProps>;
  className?: string;
  playerName?: string;
  instruction?: string;
};

export const PlayerInfo = ({
  classImg,
  className,
  playerName,
  instruction,
}: GameComponent<PLayerInfoProps>) => {
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
