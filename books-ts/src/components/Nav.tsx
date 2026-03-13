import type React from "react";
import type { NavParameter } from "../types/NavParameter";
import { Link } from 'react-router-dom'
import AuthenticatedLink from "./utils/AuthenticatedLink";

interface NavProps {
    nav: NavParameter[]
}

const Nav: React.FC<NavProps> = ({ nav }: NavProps) => {

    const renderItem = (item: NavParameter) => {
        if (typeof item.onClick === 'string') {
            return (
                <AuthenticatedLink linkVisibility={item.linkVisibility} className='nav-item' key={item.text} to={item.onClick}>
                    {item.text}
                </AuthenticatedLink>
            )
        } else {
            let fn = item.onClick as Function;
            return (
                <AuthenticatedLink linkVisibility={item.linkVisibility} key={item.text}>
                    <button className='nav-item' onClick={() => fn()}>{item.text}</button>
                </AuthenticatedLink>
            )
        }
    }

    return (
        <nav className="nav-container">
            {nav.map(item => renderItem(item))}
        </nav>
    )
}

export default Nav;