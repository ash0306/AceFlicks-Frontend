import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utilities/axiosConfig';

const NowShowingComponent = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/movies');
                setMovies(response.data);
                setFilteredMovies(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredMovies(
            movies.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, movies]);

    if (loading) {
        return (
            <div className="text-center mt-5 home-container">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const handleMovieSelection = (title) => {
        navigate(`/movie/${title}/showtimes`);
    };

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        setSearchQuery('');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="text-start">Now Showing</h1>
                    {!searchVisible && (
                        <h3><i className="ms-3 bi bi-search" onClick={toggleSearch} style={{ cursor: 'pointer' }}></i></h3>
                    )}
                    {searchVisible && (
                        <div className="d-flex align-items-center" style={{ width: '30%' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{ flex: 1 }}
                            />
                            <h3><i className="ms-2 bi bi-x" onClick={toggleSearch} style={{ cursor: 'pointer' }}></i></h3>
                        </div>
                    )}
                </div>
                <p className='fs-5 mb-4'>Catch the Latest Blockbusters and Must-See Movies!</p>
                <div className="d-flex overflow-auto nowShowing-section" style={{ whiteSpace: 'nowrap' }}>
                    {filteredMovies.map((movie, index) => (
                        <div key={index} className="mx-3" style={{ display: 'inline-block', minWidth: '200px' }}>
                            <img
                                src={movie.imageUrl}
                                className="d-block w-100"
                                alt={movie.title}
                                style={{ height: "300px", objectFit: "cover", cursor: 'pointer' }}
                                onClick={() => handleMovieSelection(movie.title)}
                            />
                            <div className="text-center mt-2">
                                <h5>{movie.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NowShowingComponent;