import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./Board/Board";
import BoardsList from "./BoardsList/BoardsList";
import Main from "./Main/Main";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
