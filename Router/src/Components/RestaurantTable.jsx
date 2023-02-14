import React, { useReducer } from "react";

export const AppContext = React.createContext();

export const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isAuth: true,
        token: action.payload.token
      };
    }
    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        isAuth: false,
        token: null
      };
    }
    default:
      return state;
  }
};

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    isAuth: false,
    token: null
  });
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;