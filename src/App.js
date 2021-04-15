import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./Style";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar} from "./apollo";
import Home from "./screens/Home";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client = {client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles/>
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? <Home /> : <Login />}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Router>
                404 Not found.
              </Router>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
