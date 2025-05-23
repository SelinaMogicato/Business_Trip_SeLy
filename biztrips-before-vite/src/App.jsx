import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MyTrips from './pages/MyTrips';
import AllTrips from './pages/AllTrips';
import Expenses from './pages/Expenses';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <div className="min-vh-100">
            <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-danger'}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold text-white" to="/">Business Trips</Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link text-white" to="/my-trips">My Trips</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/all-trips">All Trips</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/expenses">Expenses</Link></li>
                    </ul>
                    <button className="btn btn-outline-light" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
                    </button>
                </div>
            </nav>

            <div className="container py-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/my-trips" element={<MyTrips />} />
                    <Route path="/all-trips" element={<AllTrips />} />
                    <Route path="/expenses" element={<Expenses />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
