import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utilities/axiosConfig';

const NowShowingComponent = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {    
        const fetchData = async () => {
            await axiosInstance.get('/movies')
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                setLoading(false);
            });
        }
        fetchData();
    }, []);
    
    if (loading) {
        return <div className="text-center mt-5 home-container"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }
    const handleMovieSelection = (title) =>{
        navigate('/showtimes', {state:{movieTitle: title}});
    }
  return (
    <div>
        <div className="container mt-5">
            <h2 className="text-start mb-4">Now Showing</h2>
            <div className="d-flex overflow-auto nowShowing-section" style={{ whiteSpace: 'nowrap' }}>
                {movies.map((movie, index) => (
                    <div key={index} className="mx-3" style={{ display: 'inline-block', minWidth: '200px' }}>
                        <img
                            src={movie.imageUrl}
                            className="d-block w-100"
                            alt={movie.title}
                            style={{ height: "300px", objectFit: "cover" }}
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
  )
}

export default NowShowingComponent