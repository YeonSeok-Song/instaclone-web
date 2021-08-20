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
import HeaderLayout from "./components/HeaderLayout";
import Profile from "./screens/Profile";

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
                {isLoggedIn ? (
                  <HeaderLayout>
                    <Home/>
                  </HeaderLayout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route path={`/users/:userName`}>
                {isLoggedIn ? (
                  <HeaderLayout>
                    <Profile />
                  </HeaderLayout>
                ) : (
                  <Login />
                )}
              </Route>
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
