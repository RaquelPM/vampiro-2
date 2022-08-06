import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

export type LabelProps = {
  variant: 'title' | 'button' | 'body';
};

const textStyle = ({ variant }: LabelProps) => {
  const variants = {
    title: css`
      font-size: 40px;
      text-transform: uppercase;
    `,
    button: css`
      font-size: 32px;
      text-transform: uppercase;
    `,
    body: css`
      font-size: 18px;
    `,
  };

  return variants[variant];
};

export const Label = styled(Animated.Text)<LabelProps>`
  ${textStyle}
  color: white;
  font-family: 'Anton-Regular';
  include-font-padding: false;
  text-align-vertical: center;
`;
