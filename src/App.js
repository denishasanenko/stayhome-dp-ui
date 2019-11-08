import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./Board/Board";
import BoardsList from "./BoardsList/BoardsList";
import Main from "./Main/Main";
import {
  BrowserRouter,
  Switch,
  Route,
  Link, HashRouter
} from "react-router-dom"

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <div className="App">
      <HashRouter>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
        <Switch>
          <Route path="/board">
            <Board />
          </Route>
          <Route path="/list">
            <BoardsList/>
          </Route>
          <Route path="/" render={(props) => (
              <Main {...props} />
          )}>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
