import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { getStyle, render } from '@test-utils';

import { Button, ButtonProps } from '..';

let props: ButtonProps;
let children: string;

describe('components => Button', () => {
  beforeEach(() => {
    props = {
      size: 'regular',
      enabled: true,
      onPress: jest.fn(),
    };

    children = 'text';
  });

  describe('#logics', () => {
    it('should call onPress when button is pressed', () => {
      const { getByTestId } = render(<Button {...props} />);

      const button = getByTestId('button-component');

      fireEvent.press(button);

      expect(props.onPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when button is pressed and disabled', () => {
      props.enabled = false;

      const { getByTestId } = render(<Button {...props} />);

      const button = getByTestId('button-component');

      fireEvent.press(button);

      expect(props.onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('#rendering', () => {
    it('should render text children', () => {
      const { getByText } = render(<Button>{children}</Button>);

      getByText('text');
    });

    it('should change width when size changes', () => {
      props.size = 'regular';

      const { getByTestId, update } = render(<Button {...props} />);

      const button = getByTestId('button-component');

      const style = getStyle(button.props.style);

      expect(style).toHaveProperty('width');

      props.size = 'large';

      update(<Button {...props} />);

      const newButton = getByTestId('button-component');

      const newStyle = getStyle(newButton.props.style);

      expect(newStyle).toHaveProperty('width');

      expect(style?.width).toBeLessThan(newStyle?.width);
    });

    it('should change colors when disable', () => {
      props.enabled = true;

      const { getByTestId, getByText, update } = render(
        <Button {...props}>{children}</Button>
      );

      const button = getByTestId('button-component');
      const text = getByText(children);

      const buttonStyle = getStyle(button.props.style);
      const textStyle = getStyle(text.props.style);

      expect(buttonStyle).toHaveProperty('backgroundColor');
      expect(textStyle).toHaveProperty('color');

      props.enabled = false;

      update(<Button {...props}>{children}</Button>);

      const newButton = getByTestId('button-component');
      const newText = getByText(children);

      const newButtonStyle = getStyle(newButton.props.style);
      const newTextStyle = getStyle(newText.props.style);

      expect(newButtonStyle).toHaveProperty('backgroundColor');
      expect(newTextStyle).toHaveProperty('color');

      expect(newButtonStyle?.backgroundColor).not.toBe(
        buttonStyle?.backgroundColor
      );
      expect(newTextStyle?.color).not.toBe(textStyle?.color);
    });
  });
});
