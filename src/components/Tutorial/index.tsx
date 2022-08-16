import React, { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { Container, Label, ContentWrapper, InfoBtn } from './styles';

export type TutorialProps = {
  children?: React.ReactNode;
};

export const Tutorial = ({ children }: TutorialProps) => {
  const [open, setOpen] = useState(false);

  const textHeight = useRef(1000);

  const height = useSharedValue(0);

  useEffect(() => {
    if (open) {
      height.value = withTiming(textHeight.current, { duration: 300 });
    } else {
      height.value = withTiming(0, { duration: 300 });
    }
  }, [open]);

  const updateHeight = (e: LayoutChangeEvent) => {
    textHeight.current = e.nativeEvent.layout.height;
  };

  const wrapperStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Container>
      <ContentWrapper style={wrapperStyle}>
        <Label onLayout={updateHeight}>{children}</Label>
      </ContentWrapper>
      <InfoBtn
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        onPress={() => setOpen(prev => !prev)}
      >
        {open ? (
          <AntDesign name="close" color="white" size={18} />
        ) : (
          <FontAwesome name={'info-circle'} color="white" size={18} />
        )}
      </InfoBtn>
    </Container>
  );
};
