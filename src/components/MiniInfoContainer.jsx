import styled from 'styled-components';

const MiniInfoContainer = ({dato, etiqueta}) => {
  return(
    <InfoContainer>

      <Info>
        {dato}
      </Info>

      <Tag>
        {etiqueta}
      </Tag>
    </InfoContainer>
  );
};

export default MiniInfoContainer;

const InfoContainer = styled.span`
  display: flex;
  flex-direction: column;
  color: #dddddd;
`;

const Info = styled.span`
  font-size: 1.25em;
`;

const Tag = styled.span`
  font-size: .8125em;
`;