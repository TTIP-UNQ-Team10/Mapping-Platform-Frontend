import React from 'react';
import './App.css';
// import Home from './pages/Home.js'
import Login from './pages/Login.js'
import BaseHome from './pages/BaseHome.js'
import Hospitals from './pages/Hospitals.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// const APP_LOGO = '/mapping-platform-logo.svg'

const App = () => {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <BaseHome />
          </Route>
          <Route path="/hospitals">
            <Hospitals />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
