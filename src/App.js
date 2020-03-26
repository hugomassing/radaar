import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Feed from "./views/Feed";
import Search from "./views/Search";
import Artists from "./views/Artists";
import Import from "./views/Import";
import Header from "./components/Header";
import Footer from "./components/Footer";
import reset from "styled-reset";
import AuthContext from "./Auth.context";
import useAxios from "axios-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactComponent as Loader } from "./img/loading.svg";

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
    height: 100vh;
  }
  #root {
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
    :hover {
      text-decoration: underline;
    }
  }
`;

const LoadingScreen = styled.div`
  height: 100vh;
  width: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-in-out;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

const Content = styled.section`
  width: 80%;
  max-width: 1040px;
  margin: 0 80px;
  margin-top: 80px;
  margin-bottom: 80px;
  flex-grow: 2;
`;

const App = () => {
  const [search, setSearch] = useState("");
  const [{ data, loading }] = useAxios({
    url: `${process.env.REACT_APP_API_DOMAIN}/api/token`,
    headers: {
      "content-type": "application/json"
    }
  });
  return (
    <AppContainer>
      {loading ? (
        <LoadingScreen>
          <Loader />
        </LoadingScreen>
      ) : (
        <Router>
          <GlobalStyle />
          <Header search={search} setSearch={setSearch} />
          <Content>
            <AuthContext.Provider value={{ accessToken: data.access_token }}>
              {search ? (
                <Search search={search} />
              ) : (
                <Switch>
                  <Route path="/" exact>
                    <Feed />
                  </Route>
                  <Route path="/artists">
                    <Artists />
                  </Route>
                  <Route path="/import">
                    <Import />
                  </Route>
                </Switch>
              )}
            </AuthContext.Provider>
          </Content>
          <Footer />
        </Router>
      )}
    </AppContainer>
  );
};
export default App;
