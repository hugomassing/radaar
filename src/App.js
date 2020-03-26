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
    url: `https://radaar-back.now.sh/token`,
    headers: {
      "content-type": "application/json"
    }
  });
  return (
    !loading && (
      <AuthContext.Provider value={{ accessToken: data.access_token }}>
        <AppContainer>
          <Router>
            <GlobalStyle />
            <Header search={search} setSearch={setSearch} />
            <Content>
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
            </Content>
            <Footer />
          </Router>
        </AppContainer>
      </AuthContext.Provider>
    )
  );
};
export default App;
