import Circle from "./Circle";

function App() {
  // interface가 정의된 컴포넌트에 반드시 보내야하는 prop이 들어가지 않으면 에러 뜸.
  return (
    <div>
      <Circle borderColor="black" bgColor="teal" />
      <Circle text="im here" bgColor="tomato" />
    </div>
  );
}

export default App;
