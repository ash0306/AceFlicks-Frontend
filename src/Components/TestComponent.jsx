import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import axiosInstance from '../utilities/axiosConfig';

function TestComponent({ user, onLogout }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            const fetchSearchResults = async () => {
                const results1 = await axiosInstance.get('/movies');
                const results2 = await axiosInstance.get('/movies');
                setSearchResults([...results1, ...results2]);
            };

            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResults(true);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        onLogout();
        setIsDropdownOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="/AceTicketsLogo.png" alt="Company Logo" className="logo" style={{width:"40px"}}/>
                    <span className="ms-2">Company Name</span>
                </a>
                <div className="d-flex align-items-center ms-auto">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={() => setShowResults(true)}
                        onBlur={() => setTimeout(() => setShowResults(false), 100)}
                        placeholder="Search..."
                        className="form-control me-2" />
                    {showResults && searchResults.length > 0 && (
                        <div className="search-results position-absolute bg-white border border-secondary rounded shadow-sm">
                            {searchResults.map((result, index) => (
                                <div key={index} className="search-result-item p-2">
                                    {result.name}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="dropdown ms-3">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            onClick={handleDropdownToggle}
                        >
                            <i className="bi bi-person-circle h4"></i>
                        </button>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu dropdown-menu-end">
                                {user ? (
                                    <>
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li><a className="dropdown-item" href="#">Bookings</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                                    </>
                                ) : (
                                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TestComponent;
