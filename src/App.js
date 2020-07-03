import React, { useContext, useEffect } from 'react';
import { AppContext } from './store/Store.js'
import { selectNotificationState } from './store/selectors/notification.js'
import { selectSettingsState } from './store/selectors/settings.js'
import Login from './pages/Login.js'
import BaseHome from './pages/BaseHome.js'
import PublicHome from './pages/PublicHome.js'
import Category from './pages/Category.js'
import NecessityType from './pages/NecessityType.js'
import Necessity from './pages/Necessity.js'
import Setting from './pages/Setting.js'
import { Notification } from './components/Notification.js'
import AuthProvider from './components/AuthProvider.js'
import { createChangeSettingsStylesAction } from './store/actions/settings.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import * as configFile from  './config.js'
const storage = window.localStorage

const App = () => {

  const { state, dispatch } = useContext(AppContext)
  const { showNotification } = selectNotificationState(state)
  // const { config } = selectSettingsState(state)

  useEffect(() => {
    const settings = storage.getItem('styles')
    dispatch(createChangeSettingsStylesAction(JSON.parse(settings)))
  }, [storage])

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
                <PublicHome />
              )}
            />
            <Route
              path="/home"
              exact={true}
              render={props => (
                <AuthProvider Component={BaseHome} {...props} />
              )}
            />
            <Route
              path="/necessity-types"
              exact={true}
              render={props => (
                <AuthProvider Component={NecessityType} {...props}/>
              )}
            />
            <Route
              path="/categories"
              exact={true}
              render={props => (
                <AuthProvider Component={Category} {...props}/>
              )}
            />
            <Route
              path="/necessities"
              exact={true}
              render={props => (
                <Necessity {...props} />
              )}
            />
            <Route path="/necessities/:category" exact={true}
              render={(props) => (
                <Necessity {...props}/>
                )}
            >
            </Route>
            <Route path="/necessities/type/:necessityType" exact={true}
              render={(props) => (
                <Necessity {...props}/>
                )}
            >
            </Route>
            <Route path="/settings" exact={true}
              render={(props) => (
                <Setting {...props}/>
                )}
            >
            </Route>
          </Switch>
        </Router>
      </div>
      {
        showNotification ?
          <Notification /> : null
      }
    </div>
  );
}

export default App;
