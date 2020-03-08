import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Feed from "./views/Feed";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    margin: 0;
    font-family: "Kanit", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
      "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 500;
    color: #232323;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.section`
  width: 1040px;
  margin-top: 80px;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Header />
      <Content>
        <Feed />
      </Content>
    </AppContainer>
  );
}

export default App;
