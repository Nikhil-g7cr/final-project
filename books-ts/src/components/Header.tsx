import React from "react";
import type { NavParameter } from "../types/NavParameter";
import Nav from "./Nav";
import { useUserProvider } from "../providers/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "./utils/AuthContainer";

export interface HeaderProps {
    title: string,
    nav: NavParameter[]
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { user, logout } = useUserProvider();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const defaultImage = "https://randomuser.me/api/portraits/lego/0.jpg";
    
    // Determine border color based on role (Red for admin, Green for normal user)
    let borderColor = "transparent";
    if (user) {
        borderColor = user.roles?.includes("admin") ? "#dc3545" : "#198754"; 
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                
                {/* 1. Brand / Title */}
                <Link className="navbar-brand fw-bold" to="/">
                    {props.title}
                </Link>

                {/* 2. Mobile Toggle Button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* 3. Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    
                    {/* Left Side: Dynamic Navigation Links */}
                    <Nav nav={props.nav} />
                    
                    {/* Right Side: User Dropdown */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img 
                                    src={user && user.photo ? user.photo : defaultImage} 
                                    alt="Profile" 
                                    className="rounded-circle me-2" 
                                    style={{ width: "32px", height: "32px", objectFit: "cover", border: `2px solid ${borderColor}` }}
                                />
                                <span>{user ? user.name : 'Guest'}</span>
                            </a>
                            
                            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                                
                                {/* Unauthenticated View */}
                                {!user && (
                                    <>
                                        <li><Link className="dropdown-item" to="/user/login">Login</Link></li>
                                        <li><Link className="dropdown-item" to="/user/register">Register</Link></li>
                                    </>
                                )}

                                {/* Authenticated View */}
                                {user && (
                                    <>
                                        <li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/books/favorites">Favorite Books</Link></li>
                                        
                                        {/* Admin / Librarian Quick Actions */}
                                        <AuthContainer auth="authorized" roles={['admin', 'librarian']}>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><h6 className="dropdown-header text-primary">Admin Actions</h6></li>
                                            <li><Link className="dropdown-item" to="/books/add">Add New Book</Link></li>
                                            <li><Link className="dropdown-item" to="/authors/add">Add New Author</Link></li>
                                        </AuthContainer>

                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                                    </>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;