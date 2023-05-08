import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
`;

const Circle = styled(Box)`
  border-radius: 50%;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: blue;
`;

function App() {
  return (
    <div>
      <Father as="header">
        <Box bgColor="teal">
          <Text>Hello</Text>
        </Box>
        <Circle bgColor="tomato" />
      </Father>

      <Btn>Log in</Btn>
      <Btn as="a" href="/">
        Log out
      </Btn>

      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </div>
  );
}

export default App;
