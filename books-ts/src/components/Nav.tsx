import type React from "react";
import type { NavParameter } from "../types/NavParameter";
import AuthenticatedLink from "./utils/AuthenticatedLink";

interface NavProps {
    nav: NavParameter[]
}

const Nav: React.FC<NavProps> = ({ nav }: NavProps) => {

    const renderItem = (item: NavParameter, index: number) => {
        if (typeof item.onClick === 'string') {
            return (
                <li className="nav-item" key={index}>
                    <AuthenticatedLink linkVisibility={item.linkVisibility} className='nav-link' to={item.onClick}>
                        {item.text}
                    </AuthenticatedLink>
                </li>
            )
        } else {
            let fn = item.onClick as Function;
            return (
                <li className="nav-item" key={index}>
                    <AuthenticatedLink linkVisibility={item.linkVisibility}>
                        {/* Use btn-link to make a button look like a normal navbar link */}
                        <button className='nav-link btn btn-link m-0 p-2 border-0 align-baseline' onClick={() => fn()}>
                            {item.text}
                        </button>
                    </AuthenticatedLink>
                </li>
            )
        }
    }

    return (
        // me-auto pushes the user menu to the right side of the screen
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {nav.map((item, index) => renderItem(item, index))}
        </ul>
    )
}

export default Nav;