import React from 'react';
import './App.css';
import Board from "./Board/Board";
import BoardsList from "./BoardsList/BoardsList";
import Main from "./Main/Main";
import {
  Switch,
  Route,
  HashRouter,
  Redirect
} from "react-router-dom"
import {createHttpLink} from "apollo-link-http";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from 'react-apollo'
import jwt from 'jsonwebtoken';

function App() {

  const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwt');

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const logOut = (event) => {
      event.stopPropagation();
      localStorage.removeItem('jwt');
  }


  return (
    <div className="App">
      <ApolloProvider client={client}>
        <HashRouter>
          <header className="App-header">
            Vedrospective app
              <a onClick={logOut}>Log out</a>
          </header>
          <Switch>
            <PrivateRoute path="/boards/:id">
              <Board />
            </PrivateRoute>
            <PrivateRoute path="/boards">
              <BoardsList />
            </PrivateRoute>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </HashRouter>
      </ApolloProvider>
    </div>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
      <Route
          {...rest}
          render={({ location }) => {
            let authorized = true;
            try {
                const token = localStorage.getItem('jwt');
                jwt.verify(token, 'secret')
            } catch (e) {
                authorized = false;
            }
              console.log();
            return authorized ? (
                children
            ) : (
                <Redirect
                    to={{
                      pathname: "/login",
                      state: {from: location}
                    }}
                />
            )
          }
          }
      />
  );
}

export default App;
