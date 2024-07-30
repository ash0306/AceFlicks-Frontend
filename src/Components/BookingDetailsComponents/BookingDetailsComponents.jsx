import React, { useState, useEffect } from 'react'
import bookingImage from '../../assets/images/bookingImage.png'
import NavBarComponent from '../HeaderComponents/NavBarComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utilities/axiosConfig';
import ModalComponent from '../NotificationComponents/ModalComponent';
import failure from '../../assets/images/failure.png';

function BookingDetailsComponents() {
    const location = useLocation();
    const navigate = useNavigate();
    const { seats, showtime } = location.state || {};
    const [showtimeDetails, setShowtimeDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [baseFee, setBaseFee] = useState(0);
    const [convenienceFee, setConvenienceFee] = useState(0);
    const [gst, setGst] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);
    const [modalConfig, setModalConfig] = useState({
        show: false,
        title: '',
        message: '',
        imageSrc: '',
        redirectUrl: ''
    });

    const ReserveAndFreeSeats = async (seats) => {
        await axiosInstance.post('/bookings/reserveAndFreeSeats',seats,{
            withCredentials: true,
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error reserving/freeing seats:', error);
            setError('Failed to reserve/free seats');
            setLoading(false);
        })
    }

    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft(prevTime => {
            if (prevTime <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
            }
            return prevTime - 1;
        });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        console.log("showtime:"+ JSON.stringify(showtime));
        console.log("seat:"+ seats);
        const fetchData = async (showtime) => {
            await axiosInstance.get(`/showtimes/${showtime.id}`)
                .then(response => {
                    setShowtimeDetails(response.data || []);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching seats:', error);
                    setError('Failed to load seats');
                    setLoading(false);
                });
        }

        if(!showtime || !seats) {
            navigate(-1)
        }
        else{
            fetchData(showtime);
            ReserveAndFreeSeats(seats);
        }
    }, [seats, showtime, navigate]);

    useEffect(() => {
        const calculatedBaseFee = seats.length * showtime.ticketPrice;
        setBaseFee(calculatedBaseFee);

        const calculatedConvenienceFee = (calculatedBaseFee * 0.10).toFixed(2);
        setConvenienceFee(parseFloat(calculatedConvenienceFee));

        const calculatedGst = (parseFloat(calculatedConvenienceFee) * 0.18).toFixed(2);
        setGst(parseFloat(calculatedGst));

        const calculatedTotalFee = calculatedBaseFee + parseFloat(calculatedConvenienceFee) + parseFloat(calculatedGst);
        setTotalFee(calculatedTotalFee);
    },[baseFee, convenienceFee, gst, totalFee]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    const handleTimeUp = () => {
        ReserveAndFreeSeats(seats);
        newModal( 'Time out!','Your booking time has expired. Please try again.', `${failure}`,'/');
    };

    const newModal = (title, message, imageSrc, redirectUrl) => {
        setModalConfig({
            show: true,
            title,
            message,
            imageSrc,
            redirectUrl
        });
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

  return (
    <div className='home-container'>
        <NavBarComponent/>
        <div className="container p-3">
            <div className="row">
                <div className="col-6">
                    <h1 className="fw-bold my-3">Complete the booking</h1>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <h4 className="fw-bold">Time Left: <span className='text-danger'>{formatTime(timeLeft)}</span></h4>
                </div>
            </div>
            <br/>
            <div className="row gap-4">
                <div className="col-md-5 d-flex justify-content-center">
                    <span>
                    <h3>You're almost there...</h3>
                    <p>Confirm your booking and grab your tickets</p>
                    <br/>
                    <img className="img-fluid" src={bookingImage} alt="cart"/>
                    </span>
                </div>
                <div className="col-md-6">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h2 className="card-title fw-bold my-3">Booking Details</h2>
                                        <div>
                                            <p>{showtime.movie} - {showtime.theatre}</p>
                                            <p>{new Date(showtime.startTime).toLocaleDateString('en-GB')}</p>
                                            <p>{new Date(showtime.startTime).toLocaleTimeString()} - {new Date(showtime.endTime).toLocaleTimeString()}</p><br/>
                                            <div className="d-flex justify-content-between">
                                                <p>Seats:</p>
                                                <p className='fw-bold'>{seats.join(', ')}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Base Fare:</p>
                                                <p className='fw-bold'>{baseFee}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Convenience Fee:</p>
                                                <p className='fw-bold'>{convenienceFee}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>GST:</p>
                                                <p className='fw-bold'>{gst}</p>
                                            </div>
                                            <hr></hr>
                                            <div className="d-flex justify-content-between">
                                                <p>Total Fee:</p>
                                                <p className='fw-bold'>{totalFee}</p>
                                            </div>
                                        </div>
                                        <div className="col text-center">
                                            <form className="flex justify-content-center">
                                                <button type="submit" className="btn color-bg" id='color-btn'>Confirm Booking</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalComponent show={modalConfig.show} title={modalConfig.title} message={modalConfig.message} imageSrc={modalConfig.imageSrc} redirectUrl={modalConfig.redirectUrl}/>
    </div>
  )
}

export default BookingDetailsComponents