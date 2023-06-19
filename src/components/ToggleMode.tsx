import styled from "styled-components";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const ToggleBtn = styled.button`
  display: flex;
  font-size: 1.4rem;
  border-radius: 10px;
  background-color: ${props => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};
  border: 0;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  right: 0;
  transition: 0.2s ease-in;

  &:hover {
    background-color: ${props => props.theme.cardHoverBgColor};
  }
`;

function ToggleMode() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleIsDark = () => setIsDark(prev => !prev);
  return <ToggleBtn onClick={toggleIsDark}>{isDark ? <MdOutlineNightlight /> : <MdOutlineLightMode />}</ToggleBtn>;
}

export default ToggleMode;
