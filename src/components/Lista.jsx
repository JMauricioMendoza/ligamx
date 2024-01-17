import { useState, useEffect } from 'react';
import InfoContainer from './InfoContainer';
import PositionContainer from './PositionContainer';
import MiniInfoContainer from './MiniInfoContainer';
import PosicionMinima from './PosicionMinima';
import { administrarEquipos } from '../utils/administrarEquipos';
import styled, { css } from 'styled-components';
import { BsChevronDoubleDown } from 'react-icons/bs';

const Lista = () => {
  const [clickedComp, setClickedComp] = useState(null);
  const [listaEquipos, setListaEquipos] = useState([]);
  const [logos, setLogos] = useState({});

  useEffect(() => {
    fetchData();
    fetchLogos();
  }, []);

  const fetchData = () => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setListaEquipos(administrarEquipos(data)));
  };

  const fetchLogos = () => {
    fetch('/logos.json')
      .then(response => response.json())
      .then(data => setLogos(data));
  };

  const showExtraInfo = (index) => {
    setClickedComp((prevIndex) => (index === prevIndex ? null : index));
  };

  return (
    <ListContainer>
      {listaEquipos && listaEquipos.map((item, index) => (
        <TeamContainer key={index} $displayInfo={index === clickedComp}>
          <LogoContainer $displayInfo={index === clickedComp}>
            <Logo src={logos[item[0]]} />
          </LogoContainer>
          <InfoContainer
            posicion={index + 1}
            nombre={item[0]}
            puntos={item[1].puntos}
            displayInfo={index === clickedComp}
          />
          <ExtraInfoContainer $displayInfo={index === clickedComp}>
            {index === clickedComp && (
              <>
                <PositionContainer
                  posAct={index}
                  posAnt={item[1].puestoAnt}
                />
                {['PJ', 'G', 'E', 'P', 'GF', 'GC'].map(
                  (dato, idx) => (
                    <MiniInfoContainer
                      key={idx}
                      dato={item[1][dato]}
                      etiqueta={dato}
                    />
                  )
                )}     
                <MiniInfoContainer
                  dato={item[1].GF - item[1].GC}
                  etiqueta='DG'
                />
                <PosicionMinima index={index} lista={listaEquipos} />
              </>
            )}             
          </ExtraInfoContainer>
          <DownButton
            onClick={() => showExtraInfo(index)}
            $displayInfo={index === clickedComp}
          >
            <BsChevronDoubleDown/>
          </DownButton>
        </TeamContainer>
      ))}
    </ListContainer>
  );
};

export default Lista;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DownButton = styled.div`
  align-items: center;
  bottom: 10px;
  color: rgba(0, 0, 0, 0);
  cursor: pointer;
  display: flex;
  font-size: 1.8em;
  height: 30px;
  justify-content: center;
  left: 50%;
  position: absolute;
  right: 50%;
  transform: rotate(${({ $displayInfo }) => ($displayInfo ? '180deg' : '0')});
  transition: color 0.3s, transform 0.5s;
  width: 30px;

  @media (max-width: 500px) {
    font-size: 1em;
  }
`;

const TeamContainer = styled.div`
  backdrop-filter: blur(15px);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.95) 40%,
    rgba(0, 128, 255, 0.3113620448179272) 100%
  );
  border-radius: 10px;
  display: grid;
  gap: 0;
  grid-template-columns: 40% 60%;
  grid-template-rows: 100px 0;
  height: 100px;  
  transition: height 0.5s, background 0.5s;
  width: 500px;
  -webkit-backdrop-filter: blur(8.5px);

  ${({ $displayInfo }) =>
    $displayInfo &&
    css`
      background: rgba(0, 0, 0, 0.95);
      height: 400px;
      grid-template-rows: 200px auto;
    `};

  &:hover ${DownButton} {
    color: #ffffff;
  }

  @media (max-width: 500px) {
    width: 350px;
  }
`;

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${({ $displayInfo }) => ($displayInfo ? '200px' : '100px')};
  justify-content: center;
  transition: height 0.5s;
  width: 100%;
`;

const Logo = styled.img`
  max-height: 80%;
  max-width: 80%;
  object-fit: contain;
`;

const ExtraInfoContainer = styled.div`
  align-items: center;
  display: flex;
  grid-column: span 2;
  height: ${({ $displayInfo }) => ($displayInfo ? '200px' : '0')};
  justify-content: space-evenly;
  transition: height 0.5s;
`;