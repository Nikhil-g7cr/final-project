import { createContext, useContext, useReducer } from "react";
import {
  createAsyncAction,
  createReducer,
  createStore,
} from "../services/context-utils";
import BookService from "../services/BookService";

const bookContext = createContext<any>(null);

const bookReducer = {
  getAllBooks(store: any, action: any) {
    store.model.books = action.payload;
  },

  getBookById(store: any, action: any) {
    store.model.selectedBook = action.payload;
  },

  deleteBookById(store: any, action: any) {
    if (store.model.books) {
      store.model.books = store.model.books.filter(
        (b: any) => b._id !== action.payload._id,
      );
    }

    // store.model = action.payload;
  },

  addBookBy(store: any, action: any) {
    if (store.model.books) {
      store.model.books.push(action.payload);
    }
    // console.log(getAllBooks())
  },
};

interface BookProviderProps {
  children: React.JSX.Element;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const reducer = createReducer(bookReducer);

  const initStore = createStore({
    books: [],
    selectedBook: null,
  });

  const [store, dispatch] = useReducer(reducer, initStore);

  const actionCreators = {
    getAllBooks: createAsyncAction(
      "getAllBooks",
      dispatch,
      BookService.getAllBooks,
    ),
    getBookById: createAsyncAction(
      "getBookById",
      dispatch,
      BookService.getBookById,
    ),
    deleteBookById: createAsyncAction(
      "deleteBookById",
      dispatch,
      BookService.deleteBookById,
    ),
    addBookBy: createAsyncAction("addBookBy", dispatch, BookService.addBookBy),
  };

  let info = {
    books: store.model.books,
    selectedBook: store.model.selectedBook,
    ...store,
    ...actionCreators,
  };
  console.log("BooksProvider page is called--------||");
  console.log("BookProider :--", info.books);
  console.log("Store structure:", store);
  console.log("Store model:", store.model);

  return <bookContext.Provider value={info}>{children}</bookContext.Provider>;
};

export const useBookProvider = () => {
  return useContext(bookContext);
};
