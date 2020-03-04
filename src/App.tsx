import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './container/Home'
import {
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
