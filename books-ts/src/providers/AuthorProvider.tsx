import { createContext, useContext, useReducer } from "react";
import {
  createAsyncAction,
  createReducer,
  createStore,
} from "../services/context-utils";
import AuthorService from "../services/AuthorService";

const authorContext = createContext<any>(null);

const authorReducer = {
  getAllAuthors(store: any, action: any) {
    store.model.authors = action.payload;
  },

  getAuthorById(store: any, action: any) {
    store.model.selectedAuthor = action.payload;
  },
  
  deleteAuthorById(store: any, action: any) {
    if (store.model.authors) {
      store.model.authors = store.model.authors.filter(
        (a: any) => a._id !== action.payload._id
      );
    }
  },
  
  addAuthorBy(store: any, action: any) {
    if (store.model.authors) {
      store.model.authors.push(action.payload);
    }
  },
};

interface AuthorProviderProps {
  children: React.JSX.Element;
}

export const AuthorProvider = ({ children }: AuthorProviderProps) => {
  const reducer = createReducer(authorReducer);

  const initStore = createStore({
    authors: [],          
    selectedAuthor: null
  });

  const [store, dispatch] = useReducer(reducer, initStore);

  const actionCreators = {
    getAllAuthors: createAsyncAction("getAllAuthors", dispatch, AuthorService.getAllAuthors),
    getAuthorById: createAsyncAction("getAuthorById", dispatch, AuthorService.getAuthorById),
    deleteAuthorById: createAsyncAction("deleteAuthorById", dispatch, AuthorService.deleteAuthorById),
    addAuthorBy: createAsyncAction("addAuthorBy", dispatch, AuthorService.addAuthorBy),
  };

  let info = {
    authors: store.model.authors,
    selectedAuthor: store.model.selectedAuthor,
    ...store,
    ...actionCreators,
  };
  
  return <authorContext.Provider value={info}>{children}</authorContext.Provider>;
};

export const useAuthorProvider = () => {
  return useContext(authorContext);
};