import "./App.css";
import AuthorAddScreen from "./components/author/AuthorAddScreen";
import AuthorDetailsScreen from "./components/author/AuthorDetailsScreen";
import AuthorDisplay from "./components/author/AuthorDisplay";
import BookAddScreen from "./components/books/BookAddScreen";
import BookDetailsScreen from "./components/books/BookDetailsScreen";
import BookListScreen from "./components/books/BookListScreen";
import BookManagementScreen from "./components/books/BookManagementScreen";
import Header from "./components/Header";
import UserLoginScreen from "./components/users/UserLoginScreen";
import UserRegisterScreen from "./components/users/UserRegisterScreen";
import FavoriteBooksScreen from "./components/utils/FavoriteBooksScreen";
import NotFoundScreen from "./components/utils/NotFoundScreen";
import { useUserProvider } from "./providers/UserProvider";
import type { NavParameter } from "./types/NavParameter";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AdminPage from "./components/admin/AdminPage";
import UserManagementScreen from "./components/admin/UserManagementScreen";

function App() {
  const { logout } = useUserProvider();

  const mainMenu: NavParameter[] = [
    // {
    //   text:"Home",
    //   onClick:"/books"
    // },
    {
      text: "Books",
      onClick: "/books",
    },

    {
      text: "Authors",
      onClick: "/authors",
    },
    {
      text: "Favorites",
      linkVisibility: "authenticated",
      onClick: "/favorites",
    },
    {
      text: "Login",
      linkVisibility: "unauthenticated",
      onClick: "/user/login",
    },
    {
      text: "Register",
      linkVisibility: "unauthenticated",
      onClick: "/user/register",
    },
    {
      text: "Logout",
      linkVisibility: "authenticated",
      onClick: logout,
    },
  ];
  return (
    <div className="App">
      <Header title="Book's Store" nav={mainMenu} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<UserManagementScreen />} />
        <Route path="/books" element={<BookListScreen />} />
        <Route path="/books/add" element={<BookAddScreen />} />
        <Route path="/books/:id" element={<BookDetailsScreen />} />
        <Route path="/favorites" element={<FavoriteBooksScreen />} />
        <Route path="/authors" element={<AuthorDisplay />} />
        <Route path="/authors/add" element={<AuthorAddScreen />} />
        <Route path="/authors/:id" element={<AuthorDetailsScreen />} />

        <Route path="/user/login" element={<UserLoginScreen />} />
        <Route path="/user/register" element={<UserRegisterScreen />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </div>
  );
}

export default App;
