import styled, { css } from 'styled-components';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDash } from 'react-icons/ai';

const PositionContainer = ({ posAnt, posAct }) => {
  const difference = posAnt - posAct;

  return (
    <MainContainer $green={difference > 0} $red={difference < 0} $yellow={difference === 0}>
      {difference > 0 && <AiOutlineArrowUp />}
      {difference > 0 && difference}

      {difference < 0 && <AiOutlineArrowDown />}
      {difference < 0 && Math.abs(difference)}

      {difference === 0 && <AiOutlineDash />}
    </MainContainer>
  );
};

export default PositionContainer;

const MainContainer = styled.span`
  align-items: center;

  ${({ $green }) =>
    $green &&
    css`
      color: #00f000;
    `};

  ${({ $red }) =>
    $red &&
    css`
      color: #ff0000;
    `};

  ${({ $yellow }) =>
    $yellow &&
    css`
      color: #ffff00;
    `};

  display: flex;
  font-size: 1.25em;
  gap: 5px;
`;