import Lista from './components/Lista';
import styled, { createGlobalStyle } from 'styled-components';

const App = () => {

  return (
    <>
      <GlobalStyle/>

      <MainContainer>
        <Lista/>
      </MainContainer>
    </>   
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Wix Madefor Display', sans-serif;
    user-select: none;
  }
  
  body {
    background-image: url("https://cnnespanol.cnn.com/wp-content/uploads/2020/05/200526171830-liga-mx-ball-deportes-full-169.jpg?quality=100&strip=info");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
  }
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px 0 100px;
  font-size: 16px;

  @media(max-width: 500px) {
    font-size: 14px;
  };
`;