import React, { FC, ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type SvgBackgroundProps = ViewProps & {
  src: FC<SvgProps>;
  children?: ReactNode;
};

export const SvgBackground = ({
  src: Svg,
  children,
  ...rest
}: SvgBackgroundProps) => {
  return (
    <>
      <Svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        y={0}
        style={{ position: 'absolute' }}
      />
      <View {...rest}>{children}</View>
    </>
  );
};
