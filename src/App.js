import React, { useContext } from 'react';
import { AppContext } from './store/Store.js'
import { selectNotificationState } from './store/selectors/notification.js'
import Login from './pages/Login.js'
import BaseHome from './pages/BaseHome.js'
import Hospitals from './pages/Hospitals.js'
import Category from './pages/Category.js'
import NecessityType from './pages/NecessityType.js'
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
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route
              path="/"
              exact={true}
              render={props => (
                <AuthProvider Component={BaseHome} {...props} />
              )}
            />
            <Route
              path="/home"
              exact={true}
              render={props => (
                // <AuthProvider Component={BaseHome} {...props} />
                <BaseHome />
              )}
            />
            <Route
              path="/necessities"
              exact={true}
              render={props => (
                // <AuthProvider Component={NecessityType} {...props}/>
                <NecessityType />
              )}
            />
            <Route
              path="/categories"
              exact={true}
              render={props => (
                // <AuthProvider Component={Category} {...props}/>
                <Category/>
              )}
            />
            <Route path="/hospitals" exact={true}>
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
