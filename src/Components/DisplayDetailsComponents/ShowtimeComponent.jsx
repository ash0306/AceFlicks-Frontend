import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../utilities/axiosConfig';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, isSameDay, eachDayOfInterval, startOfToday } from 'date-fns';
import '../../styles/styles.css';
import ShowtimeItem from './ShowtimeItem';
import NavBarComponent from '../HeaderComponents/NavBarComponent';

function ShowtimesComponent() {
  const { type, name } = useParams();
  const [movieTitle, setMovieTitle] = useState('');
  const [theatreName, setTheatreName] = useState('');
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = startOfToday();
  const weekDates = eachDayOfInterval({ start: today, end: addDays(today, 6) });

  useEffect(() => {
    let endpoint = '';
    if (type == 'movie') {
      setMovieTitle(name);
      endpoint = `/showtimes/movie/${name}`;
    } else if (type == 'theatre') {
      setTheatreName(name);
      endpoint = `/showtimes/theatre/${name}`;
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
  }, [type, name]);

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
      <NavBarComponent />
      <div className="container my-3">
        <h2 className="text-center mb-4">
          {movieTitle ? `Showtimes for ${movieTitle}` : `Showtimes at ${theatreName}`}
        </h2>
        <div className="d-flex justify-content-center mb-4">
          {weekDates.map(date => (
            <button
              key={date}
              className={`btn btn-secondary mx-1 ${isSameDay(date, selectedDate) ? 'active color-btn' : ''}`}
              onClick={() => setSelectedDate(date)}
              id='color-btn'
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
              <div className="row">
                {mainGroup.showtimes
                  .filter(showtime => isSameDay(new Date(showtime.startTime), selectedDate))
                  .map((showtime, showtimeIndex) => (
                    <div key={showtime.id} className="col-md-3 col-sm-6 mb-3">
                      <ShowtimeItem 
                        showtime={showtime}
                        index={showtimeIndex}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShowtimesComponent;