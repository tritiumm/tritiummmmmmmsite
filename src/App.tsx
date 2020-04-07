import React from 'react';
import './App.styl';
import Home from './modules/Home/index';
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
