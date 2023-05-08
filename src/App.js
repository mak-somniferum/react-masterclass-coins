import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotateAnimate = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: tomato;
  animation: ${rotateAnimate} 1s linear infinite;

  ${Emoji} {
    &:hover {
      font-size: 70px;
    }

    &:active {
      opacity: 0.4;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">😀</Emoji>
      </Box>
      <Emoji>😀</Emoji>
    </Wrapper>
  );
}

export default App;
