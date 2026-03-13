import React, { useContext, createContext, useReducer, useEffect } from "react";
import userService from "../services/UserService";
import {
  createReducer,
  createStore,
  createAsyncAction,
} from "../services/context-utils";
const userContext = createContext<any>(null);

const userReducer = {
  login(store: any, action: any) {
    store.model = action.payload;
  },
  register(store: any, action: any) {
    store.model = action.payload;
  },
  logout(store: any) {
    store.model = null;
  },
  setUser(store: any, action: any) {
    store.model = action.payload;
  },
  favoriteBooks(store: any, action: any) {
    store.model = action.payload;
  },
};

interface UserProviderProps {
  children: React.JSX.Element;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const reducer = createReducer(userReducer);
  const initStore = createStore(null);
  const [store, dispatch] = useReducer(reducer, initStore);

  const actionCreators = {
    login: createAsyncAction("login", dispatch, userService.login),
    register: createAsyncAction("register", dispatch, userService.register),
    logout: createAsyncAction("logout", dispatch, userService.logout),
    favoriteBooks: createAsyncAction(
      "favoriteBooks",
      dispatch,
      userService.favoriteBooks,
    ),
    setUser: (user: any) => dispatch({ type: "setUser", payload: user }),
  };

  let info = {
    user: store.model,
    ...store,
    ...actionCreators,
  };

  useEffect(() => {
    userService
      .getcurrUser()
      .then((user) => {
        if (user) {
          actionCreators.setUser(user);
        }
      })
      .catch(() => {});
  }, []);

  return <userContext.Provider value={info}>{children}</userContext.Provider>;
};

export const useUserProvider = () => {
  return useContext(userContext);
};
