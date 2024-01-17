import styled from 'styled-components';

const PosicionMinima = ({ lista, index }) => {
  const calcularPosMin = () => {
    let cont = 0;

    for (let i = lista.length - 1; i > index; i--) {
      let partidosRestantes = 17 - lista[i][1].PJ;
      let puntosMaximo = partidosRestantes * 3 + lista[i][1].puntos;

      if (puntosMaximo > lista[index][1].puntos) cont++;
      if (puntosMaximo === lista[index][1].puntos && partidosRestantes !== 0) {
        cont++;
      }
    }

    return cont !== 0 ? cont + index + 1 : null;
  };

  const calcularPosMax = () => {
    for (let i = 0; i < index; i++) {
      let partidosRestantes = 17 - lista[index][1].PJ;
      let puntosMaximo = partidosRestantes * 3 + lista[index][1].puntos;

      if (puntosMaximo > lista[i][1].puntos) return i + 1;
      if (puntosMaximo === lista[i][1].puntos && partidosRestantes !== 0) {
        return i + 1;
      }
    }

    return null;
  };

  return (
    <>
      <PosMinMax $izquierda>
        {calcularPosMin() && `Puesto mínimo posible: ${calcularPosMin()}`}
        <br />
        {calcularPosMin() <= 6 && calcularPosMin() !== null && 'Liguilla'}
        {calcularPosMin() <= 10 && calcularPosMin() > 6 && 'PlayIn'}
      </PosMinMax>

      <PosMinMax $derecha>
        {calcularPosMax() && `Puesto máximo posible: ${calcularPosMax()}`}
      </PosMinMax>
    </>
  );
};

export default PosicionMinima;

const PosMinMax = styled.div`
  bottom: 10px;
  color: #dddddd;
  font-size: 0.8125em;
  left: ${({ $izquierda }) => ($izquierda ? '20px' : 'auto')};
  position: absolute;
  right: ${({ $derecha }) => ($derecha ? '20px' : 'auto')};
`;