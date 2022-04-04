import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import { reducer_types } from "./reducer-types";

const AppContext = React.createContext();

const initialState = {
    urls: [],
};

const AppContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setURL = (data) => {
    dispatch({ type: reducer_types.SET_URLS, payload: data });
  };

  return (
    <AppContext.Provider
      value={{
        context: {...state},
        setURL,
      }}
    >
        {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
    const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "User context must be called within a User context provider!"
    );
  }

  return context;
};

export { AppContext, AppContextProvider };