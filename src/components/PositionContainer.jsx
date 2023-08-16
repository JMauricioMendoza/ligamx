import styled, { css } from 'styled-components';
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDash } from 'react-icons/ai';

const PositionContainer = ({posAnt, posAct}) => {
  return(
    <MainContainer
      green={posAnt - posAct > 0}
      red={posAnt - posAct < 0}
      yellow={posAnt - posAct === 0}>

        {posAnt - posAct > 0 && (<AiOutlineArrowUp/>)}
        {posAnt - posAct > 0 && (posAnt - posAct)}
      
        {posAnt - posAct < 0 && (<AiOutlineArrowDown/>)}
        {posAnt - posAct < 0 && (posAct - posAnt)}

        {posAnt - posAct === 0 && (<AiOutlineDash/>)}
    </MainContainer>
  );
};

export default PositionContainer;

const MainContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.25em;

  ${({ green }) => green && css`
    color: #00f000;
  `};

  ${({ red }) => red && css`
    color: #ff0000;
  `};

  ${({ yellow }) => yellow && css`
    color: #ffff00;
  `};
`;