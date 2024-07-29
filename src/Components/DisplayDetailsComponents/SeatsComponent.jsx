import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axiosInstance from '../../utilities/axiosConfig';
import '../../styles/styles.css';

function SeatsComponent() {
  const location = useLocation();
  const { showtime } = location.state || {};
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(showtime);
    axiosInstance.get(`/showtimes/seats/${showtime.id}`)
      .then(response => {
        console.log(response);
        setSeats(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching seats:', error);
        setError('Failed to load seats');
        setLoading(false);
      });
  }, [showtime]);

  if (loading) {
    return (
      <div className="text-center mt-5 home-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 home-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!seats.length) {
    return (
      <div className="text-center mt-5">
        <p>No seats available.</p>
      </div>
    );
  }

  // Group seats by rows
  const rows = [...new Set(seats.map(seat => seat.row))];

  return (
    <div className='home-container'>
      <div className="container mt-5">

        <h4 className="text-center mb-4">Seat Layout</h4>
        <div>
            <div className='row mb-3'>
                <div className='btn btn-success btn-outline-success text-white p-2 mx-3 col-1'>
                    A1
                </div>
                <div className='col-10'> - Available</div>
            </div>
            <div className='row'>
                <div className='btn btn-secondary text-white p-2 mx-3 col-1'>
                    A1
                </div>
                <div className='col-10'> - Unavailable</div>
            </div>
        </div>
        <br></br>
        {rows.map(row => (
          <div key={row} className="my-3">
            <div className="row">
              <div className="col-6">
                <div className="d-flex flex-wrap justify-content-center">
                  {seats
                    .filter(seat => seat.row === row && seat.seatNumber <= 5)
                    .map(seat => {
                      const isAvailable = seat.seatStatus === 'Available';
                      return (
                        <button
                          key={seat.id}
                          className={`btn ${isAvailable ? 'btn-success btn-outline-success' : 'btn-secondary'} text-white p-2 mx-3`}
                          style={{ width: "10%",height:"10%" }}
                          disabled={!isAvailable}
                        >
                          {seat.row}{seat.seatNumber}
                        </button>
                      );
                    })}
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex flex-wrap justify-content-center">
                  {seats
                    .filter(seat => seat.row === row && seat.seatNumber > 5)
                    .map(seat => {
                      const isAvailable = seat.seatStatus === 'Available';
                      return (
                        <button
                          key={seat.id}
                          className={`btn ${isAvailable ? 'btn-success btn-outline-success' : 'btn-secondary'} text-white p-2 mx-3`}
                          style={{ width: "10%" }}
                          disabled={!isAvailable}
                        >
                          {seat.row}{seat.seatNumber}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='d-flex justify-content-center my-5'>
          <i className="bi bi-arrow-down"></i>
          <h5 className='mx-3'>Eyes this way please!</h5>
          <i className="bi bi-arrow-down"></i>
        </div>
      </div>
    </div>
  );
}

export default SeatsComponent;