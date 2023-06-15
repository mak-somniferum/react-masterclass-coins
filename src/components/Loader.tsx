import styled, { keyframes } from "styled-components";
import { TbLoaderQuarter } from "react-icons/tb";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  display: block;
  text-align: center;
  font-size: 1.4rem;

  svg {
    animation: ${rotate} 1s infinite;
  }
`;

function Loader(){
  return (
    <Loading>
      <TbLoaderQuarter />
    </Loading>
  );
}

export default Loader;