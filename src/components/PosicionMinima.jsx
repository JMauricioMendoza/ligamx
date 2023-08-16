import styled from 'styled-components';

const PosicionMinima = ({ lista, index }) => {

  const calcularPosMin = () => {

    let cont = 0;

    for(let i = lista.length - 1; i > index; i--){

      let partidosRestantes = 17 - lista[i][1].jugados;
      let puntosMaximo = partidosRestantes * 3 + lista[i][1].puntos;
      
      if(puntosMaximo > lista[index][1].puntos) cont++;
      if(puntosMaximo === lista[index][1].puntos){
        if(partidosRestantes !== 0) cont++;
      };
    };

    if(cont !== 0) return (cont + index + 1);
  };

  const calcularPosMax = () => {

    for(let i = 0; i < index; i++){

      let partidosRestantes = 17 - lista[index][1].jugados;
      let puntosMaximo = partidosRestantes * 3 + lista[index][1].puntos;
      
      if(puntosMaximo > lista[i][1].puntos) return i + 1;
      if(puntosMaximo === lista[i][1].puntos){
        if(partidosRestantes !== 0) return i + 1;
      };
    }
  };

  return(<>

    <PosMinMax
      izquierda>
        {calcularPosMin() && (`Puesto mínimo posible: ${calcularPosMin()}`)}
        <br/>
        {calcularPosMin() <= 6 && ('Liguilla')}
        {calcularPosMin() <= 10 && calcularPosMin() > 6 && ('PlayIn')}
    </PosMinMax>

    <PosMinMax
      derecha>
        {calcularPosMax() && (`Puesto máximo posible: ${calcularPosMax()}`)}  
    </PosMinMax>
  </>);
};

export default PosicionMinima;

const PosMinMax = styled.div`
  position: absolute;
  bottom: 10px;
  left: ${({izquierda}) => izquierda ? '20px' : 'auto'};
  right: ${({derecha}) => derecha ? '20px' : 'auto'};
  color: #dddddd;
  font-size: .8125em;
`;