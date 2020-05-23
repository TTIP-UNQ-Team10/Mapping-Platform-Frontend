import React, { createContext, useReducer, useContext } from "react"
import {getInitialState, mainReducer} from "./reducer";

const AppContext = createContext();

const useAppContext = () => useContext(AppContext);

const AppContextProvider = props => {
  const initialState = getInitialState();
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

let AppContextConsumer = AppContext.Consumer;

export {
  AppContext,
  useAppContext,
  AppContextProvider,
  AppContextConsumer
};
