import type React from "react";
import type { NavParameter } from "../types/NavParameter";
import AuthenticatedLink from "./utils/AuthenticatedLink";

interface NavProps {
  nav: NavParameter[];
}

const Nav: React.FC<NavProps> = ({ nav }) => {

  const renderItem = (item: NavParameter, index: number) => {

    if (typeof item.onClick === "string") {

      return (
        <li className="nav-item mx-1" key={index}>
          <AuthenticatedLink
            linkVisibility={item.linkVisibility}
            className="nav-link"
            to={item.onClick}
          >
            {item.text}
          </AuthenticatedLink>
        </li>
      );

    } else {

      const fn = item.onClick as Function;

      return (
        <li className="nav-item mx-1" key={index}>
          <AuthenticatedLink linkVisibility={item.linkVisibility}>
            <button
              className="nav-link btn btn-link text-light text-decoration-none"
              onClick={() => fn()}
            >
              {item.text}
            </button>
          </AuthenticatedLink>
        </li>
      );
    }
  };

  return (
    <ul className="navbar-nav me-auto">
      {nav.map((item, index) => renderItem(item, index))}
    </ul>
  );
};

export default Nav;