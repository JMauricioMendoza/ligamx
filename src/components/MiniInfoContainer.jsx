import styled from 'styled-components';

const MiniInfoContainer = ({ dato, etiqueta }) => {
  return (
    <Container>
      <Info>{dato}</Info>
      <Tag>{etiqueta}</Tag>
    </Container>
  );
};

export default MiniInfoContainer;

const Container = styled.span`
  color: #DDDDDD;
  display: flex;
  flex-direction: column;
`;

const Info = styled.span`
  font-size: 1.25em;
`;

const Tag = styled.span`
  font-size: 0.8125em;
`;