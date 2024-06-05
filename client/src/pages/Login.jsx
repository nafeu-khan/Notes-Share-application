// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('nafeu');
    const [password, setPassword] = useState('1234');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/token/', { username, password });
            const { access, refresh } = response.data;
            login(access, refresh);
            toast.success('Successfully logged in');
            navigate('/');
        } catch (error) {
            toast.error('Login failed');
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="grid">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="border m-2 p-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="border m-2 p-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="border m-2 p-1 border-blue-500 text-black rounded hover:bg-blue-500 hover:text-white">
                    Login
                </button>
            </form>
            <ToastContainer />
        </>
    );
};

export default Login;
