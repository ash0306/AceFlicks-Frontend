import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axiosInstance from '../../utilities/axiosConfig';
import '../../styles/styles.css';
import NavBarComponent from '../HeaderComponents/NavBarComponent';
import ToastNotification from '../NotificationComponents/ToastNotification';

function SeatsComponent() {
  const location = useLocation();
  const { showtime } = location.state || {};
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });

  useEffect(() => {
    axiosInstance.get(`/showtimes/seats/${showtime.id}`)
      .then(response => {
        setSeats(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching seats:', error);
        setError('Failed to load seats');
        setLoading(false);
      });
  }, [showtime]);

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter(id => id !== seatId);
      } else {
        if (prevSelectedSeats.length < 5) {
          return [...prevSelectedSeats, seatId];
        } else {
          newToast('bg-danger', 'Maximum number of seats selected. Only 5 tickets can be selected per booking.');
          return prevSelectedSeats;
        }
      }
    });
  };

  const newToast = (classBackground, message) => {
      setToastConfig({
      show: true,
      classBackground,
      message,
      });
  };

  const closeToast = () => {
    setToastConfig((prevState) => ({ ...prevState, show: false }));
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

  if (error) {
    return (
      <div className="text-center mt-5 home-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!seats.length) {
    return (
      <div className="text-center mt-5 home-container">
        <p>No seats available.</p>
      </div>
    );
  }

  // Group seats by rows
  const rows = [...new Set(seats.map(seat => seat.row))];

  return (
    <div className='home-container'>
      <NavBarComponent/>
      <div className="container ">
        <h1 className="text-center mb-4"><span className='color-font'>Seat</span> Layout</h1>
        <div>
          <div className='d-flex justify-content-sm-between flex-wrap flex-md-nowrap'>
            <div>
            <div className='d-flex mb-3'>
              <div className='btn btn-success btn-outline-success text-white p-2 mx-3 col-3'>
                A1
              </div>
              <div className='col-9 my-auto'> - Available</div>
            </div>
            <div className='d-flex mb-3'>
              <div className='btn btn-secondary text-white p-2 mx-3 col-3'>
                A1
              </div>
              <div className='col-9 my-auto'> - Unavailable</div>
            </div>
            <div className='d-flex mb-3'>
              <div className='btn btn-light btn-outline-success text-success p-2 mx-3 col-3'>
                A1
              </div>
              <div className='col-9 my-auto'> - Selected</div>
            </div>
            </div>
            <div className='d-flex ms-5'>
              <button className='btn color-bg my-auto' id='color-btn'>Book Tickets</button>
            </div>
          </div>
        </div>
        <br></br>
        <div className="container" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {rows.map(row => (
            <div key={row} className="d-flex justify-content-md-center my-3">
              <div className="d-flex mx-5">
                {seats
                  .filter(seat => seat.row === row && seat.seatNumber <= 5)
                  .map(seat => {
                    const isAvailable = seat.seatStatus === 'Available';
                    const isSelected = selectedSeats.includes(seat.id);
                    return (
                      <button
                        key={seat.id}
                        className={`btn ${isAvailable ? (isSelected ? 'btn-light btn-outline-success text-success' : 'btn-success btn-outline-success') : 'btn-secondary text-white'}  p-2 mx-3`}
                        style={{ width: "50px", height: "50px", flex: "0 0 auto" }}
                        disabled={!isAvailable}
                        id='seat-btn'
                        onClick={() => toggleSeatSelection(seat.id)}
                      >
                        {seat.row}{seat.seatNumber}
                      </button>
                    );
                  })}
              </div>
              <div className="d-flex mx-5">
                {seats
                  .filter(seat => seat.row === row && seat.seatNumber > 5)
                  .map(seat => {
                    const isAvailable = seat.seatStatus === 'Available';
                    const isSelected = selectedSeats.includes(seat.id);
                    return (
                      <button
                        key={seat.id}
                        className={`btn ${isAvailable ? (isSelected ? 'btn-light btn-outline-success text-success' : 'btn-success btn-outline-success') : 'btn-secondary text-white'} p-2 mx-3`}
                        style={{ width: "50px", height: "50px", flex: "0 0 auto" }}
                        disabled={!isAvailable}
                        id='seat-btn'
                        onClick={() => toggleSeatSelection(seat.id)}
                      >
                        {seat.row}{seat.seatNumber}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
        <div className='d-flex justify-content-center my-5'>
          <i className="bi bi-arrow-down"></i>
          <h5 className='mx-3'>Eyes this way please!</h5>
          <i className="bi bi-arrow-down"></i>
        </div>
      </div>
      <ToastNotification classBackground={toastConfig.classBackground} message={toastConfig.message} show={toastConfig.show} onClose={closeToast} />
    </div>
  );
}

export default SeatsComponent;