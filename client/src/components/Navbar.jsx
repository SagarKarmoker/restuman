import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { CiLight } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";

export default function Navbar() {
    const { user, loading, logout } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [theme]);

    useEffect(() => {
        if (!loading && user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user, loading]);

    const handleToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/allfoods">All Foods</NavLink></li>
                        <li><NavLink to="/gallery">Gallery</NavLink></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl">RestuMan</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/allfoods">All Foods</NavLink></li>
                    <li><NavLink to="/gallery">Gallery</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div>
                    <button className='mx-5' onClick={handleToggle}>
                        {theme === 'dark' ? <MdLightMode /> : <CiLight />}
                    </button>
                </div>

                {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <details className="dropdown">
                            <summary className="btn m-1 bg-transparent shadow-none border-none"> 
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                            </summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><Link to='/my-foods'>My Foods</Link></li>
                                <li><Link to='/add-food'>Add Foods</Link></li>
                                <li><Link to='/my-orders'>My Orders</Link></li>
                            </ul>
                        </details>
                        <button onClick={() => logout()} className="btn btn-ghost">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="btn">Login</Link>
                )}
            </div>
        </div>
    );
}
