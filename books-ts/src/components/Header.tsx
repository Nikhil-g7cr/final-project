import React from "react";
import type { NavParameter } from "../types/NavParameter";
import Nav from "./Nav";
import { useUserProvider } from "../providers/UserProvider";

export interface HeaderProps {
    title: string,
    nav: NavParameter[]
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    let { user } = useUserProvider();
    
    return (
        <header className="app-header">
            <div className="header-brand">
                <h1>{props.title}</h1>
            </div>
            
            <Nav nav={props.nav} />
            
            <div className="header-user">
                <span className="user-badge">
                    {user ? `${user.name}` : "Guest"}    
                </span>
            </div>
        </header>
    );
}

export default Header;