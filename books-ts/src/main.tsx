import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider.tsx";
import { BookProvider } from "./providers/BookProvider.tsx";
import { AuthorProvider } from "./providers/AuthorProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <UserProvider>
      <BookProvider>
        <AuthorProvider>

        <App />
        </AuthorProvider>
      </BookProvider>
    </UserProvider>
  </Router>,
);
