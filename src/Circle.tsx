import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  // interface: object shape을 typescript 에게 설명해준다.
  bgColor: string; // required
  borderColor: string; // optional
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [value, setValue] = useState<number | string>(1); // useState에서 초기값을 지정하면 타입(<>)을 지정하지 않아도 초기값의 데이터 타입으로 앞으로의 값의 타입까지 유추한다. 초기값을 지정하지 않으면 undefined.
  setValue(3);
  setValue("hello");
  // setValue(true);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
