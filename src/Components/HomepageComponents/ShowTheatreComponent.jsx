import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utilities/axiosConfig';

const ShowTheatreComponent = () => {
    const [theatres, setTheatres] = useState([]);
    const [filteredTheatres, setFilteredTheatres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/theatres');
                setTheatres(response.data);
                setFilteredTheatres(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching theatres:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredTheatres(
            theatres.filter(theatre =>
                theatre.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, theatres]);

    const handleTheatreSelection = (name) => {
        navigate(`/theatre/${name}/showtimes`);
    };

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        setSearchQuery('');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) {
        return (
            <div className="text-center mt-5 home-container">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='home-container'>
            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="text-start">Theatres</h1>
                    {!searchVisible && (
                        <h3>
                            <i className="ms-3 bi bi-search" onClick={toggleSearch} style={{ cursor: 'pointer' }}></i>
                        </h3>
                    )}
                    {searchVisible && (
                        <div className="d-flex align-items-center" style={{ width: '30%' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search theatres..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{ flex: 1 }}
                            />
                            <h3>
                                <i className="ms-2 bi bi-x" onClick={toggleSearch} style={{ cursor: 'pointer' }}></i>
                            </h3>
                        </div>
                    )}
                </div>
                <p className='fs-5 mb-4'>Discover Your Favorite Theaters and the Best Showtimes</p>
                <div className="d-flex overflow-auto theatre-section" style={{ whiteSpace: 'nowrap' }}>
                    {filteredTheatres.map((theatre, index) => (
                        <div key={index} className="mx-3 border rounded border-white" style={{ display: 'inline-block', minWidth: '200px' }}>
                            <div className="text-center mt-2" onClick={() => handleTheatreSelection(theatre.name)}>
                                <h5>{theatre.name}</h5>
                                <p>{theatre.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowTheatreComponent;