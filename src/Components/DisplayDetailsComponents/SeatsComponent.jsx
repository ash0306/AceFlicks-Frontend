import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axiosInstance from '../../utilities/axiosConfig';
import '../../styles/styles.css';
import NavBarComponent from '../HeaderComponents/NavBarComponent';
import ToastNotification from '../NotificationComponents/ToastNotification';

function SeatsComponent() {
  const location = useLocation();
  const { showtime } = location.state || {};
  const navigate = useNavigate();
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
    const fetchData = async () => {
      await axiosInstance.get(`/showtimes/seats/${showtime.id}`,{
        withCredentials: true,
      })
        .then(response => {
          setSeats(response.data || []);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching seats:', error);
          setError('Failed to load seats');
          setLoading(false);
        });
    }
    if(!showtime) {
      navigate('/', {replace: true});
    }
    else{
      fetchData(showtime);
    }
  }, [showtime, navigate]);

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

  const handleConfirmSelection = () => {
    if (selectedSeats.length === 0) {
      newToast('bg-danger', 'Please select at least one seat.');
      return;
    }
    console.log(selectedSeats);
    console.log(showtime);
    navigate(`/${showtime.movie}/${showtime.theatre}/${showtime.id}/${selectedSeats.length}/booking`, {state:{seats: selectedSeats, showtime: showtime}, replace: true})
  }

  if (loading) {
    return (
      <div className="home-container">
        <NavBarComponent/>
        <div className="text-center spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center home-container">
        <NavBarComponent/>
        <p className='text-center'>{error}</p>
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
        <div className='d-flex justify-content-md-between'>
          <div className='d-flex flex-column'>
            <h4>{showtime.movie} - {showtime.theatre}</h4>
            <p>{new Date(showtime.startTime).toLocaleDateString('en-GB')}</p>
            <p>{new Date(showtime.startTime).toLocaleTimeString()} - {new Date(showtime.endTime).toLocaleTimeString()}</p><br/>
          </div>
          <div className='ms-3'>
            <button className='btn color-bg' id='color-btn' onClick={() => handleConfirmSelection()}>Confirm Selection <i className="bi bi-arrow-right"></i></button>
          </div>
        </div>
        <div>
          {/* guide & book ticket button */}
            <div className='d-flex flex-row'>
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
              <div className='btn btn-light text-success p-2 mx-3 col-3'>
                A1
              </div>
              <div className='col-9 my-auto'> - Selected</div>
            </div>
          </div>
        </div>
        <br></br>
        {/* seat layout */}
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