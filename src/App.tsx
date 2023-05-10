import styled from "styled-components";
import { useState } from "react";

interface DummyProps {
  text: string;
  active?: boolean;
}

interface TitleProps {
  active?: boolean;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const Title = styled.h1<TitleProps>`
  color: ${(props) => props.theme.textColor};
  display: ${(props) => (props.active ? "block" : "none")};
`;

function Dummy({ text, active = false }: DummyProps) {
  return <Title active={active}>{text}</Title>;
}

function App() {
  const [isActive, setIsActive] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget);
    setIsActive(!isActive);
  };

  return (
    <Container>
      <Dummy text="Hello" active />
      <Dummy text="Boom!" active={isActive} />
      <button onClick={onClick}>Click me</button>
    </Container>
  );
}

export default App;
