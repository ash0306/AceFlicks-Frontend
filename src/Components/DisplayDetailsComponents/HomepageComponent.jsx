import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../utilities/axiosConfig';
import '../../styles/styles.css';
import { useNavigate } from 'react-router-dom';

function HomepageComponent() {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/movies/running')
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
    
      axiosInstance.get('/theatres')
      .then(response => {
        setTheatres(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching theatres:', error);
        setLoading(false);
      });
  }, []);

  const handleMovieSelection = (title) =>{
    navigate('/showtimes', {state:{movieTitle: title}});
  }
  
  const handleTheatreSelection = (name) =>{
    navigate('/showtimes', {state:{theatreName: name}});
  }

  if (loading) {
    return <div className="text-center mt-5 home-container"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  return (
    <div className='home-container'>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Now Showing</h2>
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

      <div className="container mt-5">
        <h2 className="text-center mb-4">Theatres</h2>
        <div className="d-flex overflow-auto theatre-section" style={{ whiteSpace: 'nowrap' }}>
          {theatres.map((theatre, index) => (
            <div key={index} className="mx-3" style={{ display: 'inline-block', minWidth: '200px' }}>
              <div className="text-center mt-2" onClick={() => {handleTheatreSelection(theatre.name)}}>
                <h5>{theatre.name}</h5>
                <p>{theatre.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomepageComponent;