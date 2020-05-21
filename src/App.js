import React, { useContext } from 'react';
import { AppContext } from './store/Store.js'
import { selectNotificationState } from './store/selectors/notification.js'
import Login from './pages/Login.js'
import BaseHome from './pages/BaseHome.js'
import Hospitals from './pages/Hospitals.js'
import { Notification } from './components/Notification.js'
import AuthProvider from './components/AuthProvider.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import './config.js'

const App = () => {

  const { state } = useContext(AppContext)
  const { showNotification } = selectNotificationState(state)

  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home"
              render={props => (
                <AuthProvider Component={BaseHome} {...props} />
              )}
            />
            <Route path="/hospitals">
              <Hospitals />
            </Route>
          </Switch>
        </Router>
      </div>
      {
        showNotification ?
          <Notification className="notification"/> : null
      }
    </div>
  );
}

export default App;
