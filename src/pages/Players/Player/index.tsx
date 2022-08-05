import React from 'react';
import Animated, {
  Keyframe,
  runOnJS,
  scrollTo,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container, IconWrapper, Label, Wrapper } from './styles';

export type PlayerProps = {
  id: number;
  name: string;
  length: number;
  scroll: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  scrollHeight: SharedValue<number>;
  positions: SharedValue<Record<number, number>>;
  onPress: () => void;
  onShift: (target: number) => void;
};

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export const Player = ({
  id,
  name,
  length,
  scroll,
  scrollRef,
  scrollHeight,
  positions,
  onPress,
  onShift,
}: PlayerProps) => {
  const index = positions.value[id];

  const outStyle = {
    opacity: 0,
    transform: [
      {
        translateX: 150 * (index % 2 === 0 ? -1 : 1),
      },
    ],
  };

  const inStyle = {
    opacity: 1,
    transform: [
      {
        translateX: 0,
      },
    ],
  };

  const exiting = new Keyframe({
    from: inStyle,
    to: outStyle,
  }).duration(300);

  const position = useSharedValue(positions.value[id] * 84 + 10);
  const initial = useSharedValue(positions.value[id]);
  const active = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    value => {
      if (!active.value) {
        position.value = withSpring(value * 84);
      }
    }
  );

  const drag = Gesture.Pan()
    .onBegin(() => {
      active.value = true;

      initial.value = position.value;
    })
    .onUpdate(e => {
      const y = e.translationY + initial.value;

      const overflow = scrollHeight.value < length * 84;

      const min = overflow ? scroll.value : 0;

      const max =
        (overflow ? scroll.value + scrollHeight.value : scrollHeight.value) -
        84;

      if (y < 0 || y > Math.max(scrollHeight.value, length * 84) - 84) {
        return;
      }

      if (y <= min + 20) {
        scrollTo(scrollRef, 0, scroll.value + y - min - 20, false);
      }

      if (y >= max - 104) {
        scrollTo(scrollRef, 0, scroll.value + y - max + 104, false);
      }

      const newIndex = Math.round((y - 10) / 84);

      if (newIndex !== positions.value[id]) {
        runOnJS(onShift)(newIndex);
      }

      position.value = y;
    })
    .onEnd(() => {
      position.value = withSpring(84 * positions.value[id]);
    })
    .onFinalize(() => {
      active.value = false;
    });

  const dragStyle = useAnimatedStyle(() => ({
    top: position.value,
    zIndex: active.value ? length : positions.value[id],
    elevation: active.value ? length : positions.value[id],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    color: active.value ? 'blue' : 'gray',
  }));

  return (
    <Container index={index} style={dragStyle}>
      <Wrapper rippleColor="#9994" onPress={onPress} exiting={exiting}>
        <Label>{name}</Label>
        <GestureDetector gesture={Gesture.Simultaneous(drag)}>
          <IconWrapper>
            <AnimatedIcon name="menu" size={20} style={iconStyle} />
          </IconWrapper>
        </GestureDetector>
      </Wrapper>
    </Container>
  );
};
