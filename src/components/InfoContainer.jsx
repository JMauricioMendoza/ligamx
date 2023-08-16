import styled, { css } from 'styled-components';

const InfoContainer = ({ posicion, nombre, puntos, displayInfo }) => {


  return(
    <MainContainer
      displayInfo={displayInfo}>

        <Info
          displayInfo={displayInfo}
          nombre>
            { nombre }
        </Info>

        <Info
          displayInfo={displayInfo}
          puntos>
            { puntos } pts.
        </Info>

        <SideDiv
          blue={posicion <= 6}
          green={posicion <= 8 && posicion > 6}
          red={posicion <= 10 && posicion > 8}
          displayInfo={displayInfo}>
          <PlaceIndex>
            { posicion }
          </PlaceIndex>

          <Liguilla>
            {posicion <= 6 && ('Liguilla')}
            {posicion <= 10 && posicion > 6 && ('PlayIn')}
          </Liguilla>
        </SideDiv>
    </MainContainer>
  ); 
};

export default InfoContainer;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: ${({displayInfo}) => displayInfo ? '200px' : '100px'};
  transition: height .5s;
`;

const Info = styled.div`
  transition: font-size .5s;

  ${({ nombre }) => nombre && css`
    color: #eeeeee;
    font-size: ${({displayInfo}) => displayInfo ? '1.875em' : '1.3125em'};
  `};

  ${({ puntos }) => puntos && css`
    color: #dddddd;
    font-size: ${({displayInfo}) => displayInfo ? '1.75em' : '1.1875em'};
  `};
`;

const SideDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 28px;
  height: 100px;
  border-radius: 0 10px 10px 0;
  transition: background .5s;

  ${({blue}) => blue && css`
    background-color:${({displayInfo}) => displayInfo ? 'rgba(0,0,0,0.95)' : '#2874A6'};
  `};

  ${({green}) => green && css`
    background-color:${({displayInfo}) => displayInfo ? 'rgba(0,0,0,0.95)' : '#239B56'};
  `};

  ${({red}) => red && css`
    background-color:${({displayInfo}) => displayInfo ? 'rgba(0,0,0,0.95)' : '#B03A2E'};
  `};
`;

const PlaceIndex = styled.div`
  color: #ffffff;
  font-size: 1.4375em;
`;

const Liguilla = styled.span`
  color: #ffffff;
  font-size: 0.875em;
  transform: rotate(90deg);
`;