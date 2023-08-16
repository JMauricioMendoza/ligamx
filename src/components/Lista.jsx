import { useState, useEffect } from 'react';
import InfoContainer from './InfoContainer';
import PositionContainer from './PositionContainer';
import MiniInfoContainer from './MiniInfoContainer';
import PosicionMinima from './PosicionMinima';
import { administrarEquipos } from '../utils/administrarEquipos';
import styled, { css } from 'styled-components';
import { BsChevronDoubleDown } from 'react-icons/bs';

const Lista = () => {

  const [ clickedComp, setClickedComp ] = useState( null );

  const [ listaEquipos, setListaEquipos ] = useState( [] );

  const [ logos, setLogos ] = useState( {} );

  useEffect( () => {
    fetchData();
    fetchLogos();
  }, [] );

  const fetchData = () => {
    fetch( '/data.json' )
      .then( response => response.json() )
        .then( data => setListaEquipos( administrarEquipos( data ) ) );
  };

  const fetchLogos = () => {
    fetch( '/logos.json' )
      .then( response => response.json() )
        .then( data => setLogos( data)  );
  };

  const showExtraInfo = index => {

    if( index === clickedComp ){
      setClickedComp( null );
    };
    

    if( index !== clickedComp ){
      setClickedComp( index );
    };
  };

  return(

    <ListContainer>

      { listaEquipos && listaEquipos.map( ( item, index ) => (

        <TeamContainer 
          key={ index }
          displayInfo={ index === clickedComp }>

            <LogoContainer
            displayInfo={ index === clickedComp }>

              <Logo
                src={ logos[item[0]] }/>
            </LogoContainer>

            <InfoContainer
              posicion={ index + 1 }
              nombre={ item[0] }
              puntos={ item[1].puntos }
              displayInfo={ index === clickedComp }/>

            <ExtraInfoContainer
              displayInfo={ index === clickedComp }>

                {index === clickedComp && (<>
                  <PositionContainer
                    posAct={index}
                    posAnt={item[1].puestoAnt}/>

                  <MiniInfoContainer
                    dato={item[1].jugados}
                    etiqueta='PJ'/>

                  <MiniInfoContainer
                    dato={item[1].ganados}
                    etiqueta='G'/>

                  <MiniInfoContainer
                    dato={item[1].empatados}
                    etiqueta='E'/>

                  <MiniInfoContainer
                    dato={item[1].perdidos}
                    etiqueta='P'/>

                  <MiniInfoContainer
                    dato={item[1].gf}
                    etiqueta='GF'/>

                  <MiniInfoContainer
                    dato={item[1].gc}
                    etiqueta='GC'/>

                  <MiniInfoContainer
                    dato={item[1].gf - item[1].gc}
                    etiqueta='DG'/>

                  <PosicionMinima
                    index={index}
                    lista={listaEquipos}/>
                </>)}                        
                
            </ExtraInfoContainer>

            <DownButton
                onClick={ () => showExtraInfo(index) }
                displayInfo={ index === clickedComp }>
                  <BsChevronDoubleDown/>
            </DownButton>
        </TeamContainer>
      )) }
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
  position: absolute;
  left: 50%;
  right: 50%;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width:30px;
  height:30px;
  color: rgba(0, 0, 0, 0);
  font-size: 1.8em;
  cursor: pointer;
  transform: rotate( ${ ({ displayInfo }) => displayInfo ? '180deg' : '0' } );
  transition: color .3s, transform .5s;

  @media(max-width: 500px) {
    font-size: 1em;
  };
`;

const TeamContainer = styled.div`  
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 100px 0;
  gap: 0;
  width: 500px;
  height: 100px;
  background: linear-gradient(90deg, rgba(0,0,0,0.95) 40%, rgba(0,128,255,0.3113620448179272) 100%);
  border-radius: 10px;
  backdrop-filter: blur( 15px );
  -webkit-backdrop-filter: blur( 8.5px );
  transition: height .5s, background .5s;

  ${({ displayInfo }) => displayInfo && css`
    height: 400px;
    grid-template-rows: 200px auto;
    background: rgba(0,0,0,0.95);
  `};

  &:hover ${DownButton}{
    color: #ffffff;
  };

  @media (max-width: 500px) {
    width: 350px;
  };
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ displayInfo }) => displayInfo ? '200px' : '100px'};
  transition: height .5s;
`;

const Logo = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
`;

const ExtraInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  grid-column: span 2;
  height: ${({ displayInfo }) => displayInfo ? '200px' : '0'};
  transition: height .5s;
`;