import React from "react";
import type { NavParameter } from "../types/NavParameter";
import Nav from "./Nav";
import { useUserProvider } from "../providers/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "./utils/AuthContainer";

export interface HeaderProps {
  title: string;
  nav: NavParameter[];
}
const Header: React.FC<HeaderProps> = ({ title, nav }) => {
  const { user, logout } = useUserProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const defaultImage = "https://randomuser.me/api/portraits/men/51.jpg";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-semibold fs-4" to="/">
          {title}
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <Nav nav={nav} />

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <img
                  src={user?.photo || defaultImage}
                  alt="profile"
                  className="rounded-circle border"
                  style={{
                    width: "34px",
                    height: "34px",
                    objectFit: "cover"
                  }}
                />

                <span className="fw-medium">
                  {user ? user.name : "Guest"}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm">

                {!user && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/user/login">
                        Login
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/user/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}

                {user && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/user/profile">
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/favorites">
                        Favorite Books
                      </Link>
                    </li>

                    <AuthContainer auth="authorized" roles={["admin", "librarian"]}>
                      <li>
                        <Link className="dropdown-item" to="/books/add">
                          Add Book
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/authors/add">
                          Add Author
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/admin">
                          Admin Dashboard
                        </Link>
                      </li>
                    </AuthContainer>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

              </ul>

            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;