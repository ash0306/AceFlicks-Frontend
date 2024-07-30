import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../utilities/axiosConfig';
import { addDays, isSameDay, eachDayOfInterval, startOfToday } from 'date-fns';
import '../../styles/styles.css';
import ShowtimeItem from './ShowtimeItem';
import NavBarComponent from '../HeaderComponents/NavBarComponent';

function ShowtimesComponent() {
  const location = useLocation();
  const { movieTitle, theatreName } = location.state || {};
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate an array of dates for the current week starting from today
  const today = startOfToday();
  const weekDates = eachDayOfInterval({ start: today, end: addDays(today, 7) });

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

  const filteredShowtimes = showtimes.filter(mainGroup => 
    mainGroup.showtimes.some(showtime => 
      isSameDay(new Date(showtime.startTime), selectedDate)
    )
  );

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
      <NavBarComponent/>
      <div className="container my-3">
        <h2 className="text-center mb-4">
          {movieTitle ? `Showtimes for ${movieTitle}` : `Showtimes at ${theatreName}`}
        </h2>
        <div className="d-flex justify-content-center mb-4">
          {weekDates.map(date => (
            <button
              key={date}
              className={`btn btn-secondary mx-1 ${isSameDay(date, selectedDate) ? 'active' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </button>
          ))}
        </div>
        {filteredShowtimes.length === 0 ? (
          <p className="text-center">No showtimes available for the selected date.</p>
        ) : (
          filteredShowtimes.map((mainGroup, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              <h4>{mainGroup.name}</h4>
              <ul className="list-unstyled">
                {mainGroup.showtimes
                  .filter(showtime => isSameDay(new Date(showtime.startTime), selectedDate))
                  .map((showtime, showtimeIndex) => (
                    <ShowtimeItem 
                      key={showtime.id}
                      showtime={showtime}
                      index={showtimeIndex}
                    />
                  ))
                }
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShowtimesComponent;