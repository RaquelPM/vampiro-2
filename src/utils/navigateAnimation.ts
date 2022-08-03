import {
  StackCardStyleInterpolator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

const cardStyleInterpolator: StackCardStyleInterpolator = props => {
  return {
    ...TransitionPresets.SlideFromRightIOS.cardStyleInterpolator(props),
    containerStyle: {
      opacity: props.next?.progress.interpolate({
        inputRange: [0, 0.99999, 1],
        outputRange: [1, 1, 0],
      }),
    },
  };
};

export const navigateAnimation: Partial<StackNavigationOptions> = {
  ...TransitionPresets.SlideFromRightIOS,
  cardStyleInterpolator,
  cardOverlayEnabled: false,
};
