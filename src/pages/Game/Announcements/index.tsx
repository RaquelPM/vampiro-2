import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { useGame, useOnce } from '~/hooks';
import { getRandomInteger } from '~/utils';
import { GameNavigationScreens } from '~/types';

import {
  BodySmall,
  BodyTitle,
  Container,
  Head,
  HeadTitle,
  InfoWrapper,
  NextBtn,
  Sun,
} from './styles';

export type AnnouncementsScreenProps = StackScreenProps<
  GameNavigationScreens,
  'Announcements'
>;

export const Announcements = ({ navigation }: AnnouncementsScreenProps) => {
  const game = useGame();

  const announcement = useOnce(() => {
    const random = getRandomInteger(0, game.announcements.length);

    return game.announcements.splice(random, 1)[0];
  });

  const head = useOnce(() => {
    if (announcement.style === 'only-class') {
      return {
        title: announcement.title,
        image: announcement.image,
      };
    }

    if (announcement.style === 'only-player') {
      return {
        title: announcement.title,
        image: null,
      };
    }

    return announcement.class;
  });

  const body = useOnce(() => {
    if (announcement.style === 'only-class') {
      return null;
    }

    if (announcement.style === 'only-player') {
      return {
        title: null,
        image: announcement.image,
        small: announcement.class,
      };
    }

    return {
      title: announcement.player.name,
      image: announcement.player.image,
      small: announcement.player.class,
    };
  });

  const HeadImg = head.image;
  const BodyImg = body?.image;

  const onNext = () => {
    if (game.announcements.length > 0) {
      navigation.replace('Announcements');
    }
  };

  return (
    <Container>
      <Sun />
      <InfoWrapper>
        <Head column={announcement.style === 'only-class'}>
          {HeadImg && (
            <HeadImg
              width={announcement.style === 'only-class' ? 120 : 100}
              height={announcement.style === 'only-class' ? 230 : 190}
              preserveAspectRatio="xMidYMid meet"
            />
          )}
          <HeadTitle single={announcement.style === 'only-class'}>
            {head.title}
          </HeadTitle>
        </Head>
        {body && (
          <>
            {BodyImg && (
              <BodyImg
                width={120}
                height={230}
                preserveAspectRatio="xMidYMax meet"
              />
            )}
            {body.title && <BodyTitle>{body.title}</BodyTitle>}
            <BodySmall>{body.small}</BodySmall>
          </>
        )}
      </InfoWrapper>
      <NextBtn onPress={onNext}>Próximo</NextBtn>
    </Container>
  );
};
