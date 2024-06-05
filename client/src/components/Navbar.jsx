// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated,user, logout } = useContext(AuthContext);
    const [toggle, setToggle] = useState(true);

    return (
        <nav className="flex justify-between bg-teal-300">
            <div className="font-bold text-lg p-2">
                <h1 className='font-[monospace] font-bold tracking-tight text-4xl p-1'>
                <Link to="/" className="hover:drop-shadow-lg">
                        <span className="text-orange-300">N</span><span>otes</span>
                </Link>
                </h1>
            </div>
            <div className="sm:hidden inline-block m-2" onClick={() => setToggle(!toggle)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
            <div className={`${toggle ? 'hidden' : ''} absolute grid w-full top-9 bg-teal-300 sm:mx-2 sm:p-2 text-center text-black sm:relative sm:top-0 sm:justify-end sm:flex`}>
                <Link to="/" className="p-1 sm:mx-2 sm:p-2 hover:font-bold">
                    Home
                </Link>
                {isAuthenticated ? (
                      <>
                        <Link to="/profile" className="p-1 sm:mx-2 sm:p-2 hover:font-bold">
                            Profile
                        </Link>
                        <Link to="/" className="p-1 sm:mx-2 sm:p-2 hover:font-bold" onClick={() => { setToggle(!toggle); logout(); }}>
                            Logout
                        </Link>
                        </>
                ) : (
                    <>
                        <Link to="/login" className="p-1 sm:mx-2 sm:p-2 hover:font-bold">
                            Login
                        </Link>
                        <Link to="/register" className="p-1 sm:mx-2 sm:p-2 hover:font-bold">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
