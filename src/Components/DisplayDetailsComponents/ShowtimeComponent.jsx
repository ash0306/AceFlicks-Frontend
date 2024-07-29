import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../utilities/axiosConfig';
import '../../styles/styles.css';
import ShowtimeItem from './ShowtimeItem';

function ShowtimesComponent() {
  const location = useLocation();
  const { movieTitle, theatreName } = location.state || {};
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let endpoint = '';
    if (movieTitle) {
      endpoint = `/showtimes/movie/${movieTitle}`;
    } else if (theatreName) {
      endpoint = `/showtimes/theatre/${encodeURIComponent(theatreName)}`;
    }

    if (endpoint) {
      axiosInstance.get(endpoint)
        .then(response => {
          setShowtimes(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching showtimes:', error);
          setLoading(false);
        });
    }
  }, [movieTitle, theatreName]);

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
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          {movieTitle ? `Showtimes for ${movieTitle}` : `Showtimes at ${theatreName}`}
        </h2>
        {showtimes.length === 0 ? (
          <p className="text-center">No showtimes available.</p>
        ) : (
          showtimes.map((mainGroup, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            <h4>{mainGroup.name}</h4>
            <ul className="list-unstyled">
              {mainGroup.showtimes.map((showtime, showtimeIndex) => (
                <ShowtimeItem 
                  key={showtime.id}
                  showtime={showtime}
                  index={showtimeIndex}
                />
              ))}
            </ul>
          </div>
        ))
        )}
      </div>
    </div>
  );
}

export default ShowtimesComponent;
