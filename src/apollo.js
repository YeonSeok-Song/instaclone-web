import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination, } from "@apollo/client/utilities";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

const httpLink = createHttpLink({
  uri : "http://localhost:4000/graphql/",
});

export const darkModeVar = makeVar((localStorage.getItem(DARK_MODE) === "enable" ? true : false));

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    }
  }
});
/*
Query : {
        fields : {
          seeFeed : {
            keyArgs : ["typename"],
          }
        }
      },
    */

export const client = new ApolloClient({
  link : authLink.concat(httpLink),
  cache : new InMemoryCache({
    typePolicies : {
      Query: {
        fields: {
          seeFeed: offsetLimitPagination(["type", "Photo"])
        },
      },
      User : {
        keyFields : (obj) => `User:${obj.userName}`,
      },
      Photo : {
        merge(existing, incoming) {
          return {...existing, ...incoming};
        }
      },
    }
  }),
});
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enable");
  darkModeVar(true)
}

export const disableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "disable");
  darkModeVar(false)
}


export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload(0);
};
