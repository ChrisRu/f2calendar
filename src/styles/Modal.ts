import styled, { keyframes } from 'styled-components'

export const ModalWrapper = styled.div<{ center?: boolean }>`
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 1;

  @media (max-width: 1000px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

const FadeInAnimation = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation-name: ${FadeInAnimation};
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
  animation-play-state: running;
`
