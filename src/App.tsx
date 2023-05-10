import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1<{ active?: boolean }>`
  color: ${(props) => props.theme.textColor};
  display: ${(props) => (props.active ? "block" : "none")};
`;

interface DummyProps {
  text: string;
  active?: boolean;
}

function Dummy({ text, active = false }: DummyProps) {
  return <H1 active={active}>{text}</H1>;
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
