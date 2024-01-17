import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Lista from './components/Lista';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Lista />
      </MainContainer>
    </>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Wix Madefor Display', sans-serif;
    margin: 0;
    padding: 0;
    user-select: none;
  }
  
  body {
    background-attachment: fixed;
    background-image: url("https://cnnespanol.cnn.com/wp-content/uploads/2020/05/200526171830-liga-mx-ball-deportes-full-169.jpg?quality=100&strip=info");
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const MainContainer = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: center;
  padding: 50px 0 100px;
  width: 100%;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;