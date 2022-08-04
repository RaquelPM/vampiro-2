import styled from 'styled-components/native';

export const Overlay = styled.View`
  width: ${p => 2 * p.theme.window.width}px;
  height: ${p => 2 * p.theme.window.height}px;

  background: rgba(0, 0, 0, 0.4);
`;

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const Body = styled.View`
  padding: 42px 0;

  width: ${p => p.theme.window.width - 40}px;
  background: white;
  border-radius: 5px;

  align-items: center;
`;
