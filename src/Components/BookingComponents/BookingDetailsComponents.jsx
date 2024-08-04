import React, { useState, useEffect } from 'react';
import bookingImage from '../../assets/images/bookingImage.png';
import NavBarComponent from '../HeaderComponents/NavBarComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utilities/axiosConfig';
import ModalComponent from '../NotificationComponents/ModalComponent';
import failure from '../../assets/images/failure.png';
import RefreshModal from '../NotificationComponents/RefreshModalComponent';
import { useSelector } from 'react-redux';

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
    const { userId } = useSelector((state) => state.auth);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        show: false,
        title: '',
        message: '',
        imageSrc: '',
        redirectUrl: ''
    });

    const ReserveSeats = async (seats) => {
        await axiosInstance.post('/bookings/reserveSeats', seats, {
            withCredentials: true,
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error reserving seats:', error);
                setError('Failed to reserve seats. ', error);
                setLoading(false);
            });
    }

    const FreeSeats = async (seats) => {
        await axiosInstance.post('/bookings/freeSeats', seats, {
            withCredentials: true,
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error freeing seats:', error);
                setError('Failed to free seats. ', error);
                setLoading(false);
            });
    }

    const [modalShow, setModalShow] = useState(false);

    // Function to handle "Continue" action
    const handleContinue = () => {
        FreeSeats(seats);
        navigate('/');
        setModalShow(false);
    };

    // Function to handle "Cancel" action
    const handleCancel = () => {
        setModalShow(false);
    };

    // useEffect for timer
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

    // UseEffect to get showtime details
    useEffect(() => {
        console.log("showtime:" + JSON.stringify(showtime));
        console.log("seat:" + seats);
        const fetchData = async (showtime) => {
            await axiosInstance.get(`/showtimes/${showtime.id}`, {
                withCredentials: true,
            })
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

        if (!showtime || !seats) {
            navigate(-1)
        } else {
            fetchData(showtime);
            ReserveSeats(seats);
        }
    }, [seats, showtime, navigate]);

    // UseEffect to calculate fees
    useEffect(() => {
        const calculatedBaseFee = seats.length * showtime.ticketPrice;
        setBaseFee(calculatedBaseFee);

        const calculatedConvenienceFee = (calculatedBaseFee * 0.10).toFixed(2);
        setConvenienceFee(parseFloat(calculatedConvenienceFee));

        const calculatedGst = (parseFloat(calculatedConvenienceFee) * 0.18).toFixed(2);
        setGst(parseFloat(calculatedGst));

        const calculatedTotalFee = baseFee + convenienceFee + gst;
        setTotalFee(calculatedTotalFee);
    }, [baseFee, convenienceFee, gst, totalFee]);

    // useeffect for page refresh
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            // navigate('/');
            setModalShow(true);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleTimeUp = () => {
        FreeSeats(seats);
        newModal('Time out!', 'Your booking time has expired. Please try again.', `${failure}`, '/');
    };

    const newModal = (title, message, imageSrc, redirectUrl) => {
        console.log("showing modal...");
        setModalConfig({
            show: true,
            title,
            message,
            imageSrc,
            redirectUrl
        });
    };

    const handleBooking = async () => {
        setBookingLoading(true); // Set loading state to true
        await axiosInstance.post('/bookings', {
            "userId": userId,
            "showtimeId": showtimeDetails.id,
            "seats": seats,
            "totalPrice": totalFee
        }, {
            withCredentials: true,
            timeout: 60000 // Set timeout to 60 seconds
        })
            .then(response => {
                console.log(response);
                navigate('/booking-confirmation', { state: { bookingDetails: response.data, showtime: showtime }, replace: true });
            })
            .catch(error => {
                console.error('Error booking:', error);
                newModal('Failed to book', `Unable to book your tickets at the moment. ${error}`, `${failure}`, '/');
            })
            .finally(() => {
                setBookingLoading(false); // Set loading state to false
            });
    }

    if (loading) {
        return (
            <div className="home-container">
                <NavBarComponent />
                <div className="text-center spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container">
                <NavBarComponent />
                <p className='text-center '>{error}</p>
            </div>
        );
    }

    return (
        <div className='home-container'>
            <NavBarComponent />
            <div className="container p-3">
                <div className="row">
                    <div className="col-6">
                        <h1 className="fw-bold my-3">Complete the booking</h1>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <h4 className="fw-bold">Time Left: <span className='text-danger'>{formatTime(timeLeft)}</span></h4>
                    </div>
                </div>
                <br />
                <div className="row gap-4">
                    <div className="col-md-5 d-flex justify-content-center">
                        <span>
                            <h3>You're almost there...</h3>
                            <p>Confirm your booking and grab your tickets</p>
                            <br />
                            <img className="img-fluid" src={bookingImage} alt="cart" />
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
                                                <p>{new Date(showtime.startTime).toLocaleTimeString()} - {new Date(showtime.endTime).toLocaleTimeString()}</p><br />
                                                <div className="d-flex justify-content-between">
                                                    <p>Seats:</p>
                                                    <p className='fw-bold'>{seats.length}</p>
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
                                                    {bookingLoading ? (
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    ) : (
                                                        <button type="button" className="btn color-bg" id='color-btn' onClick={handleBooking}>Confirm Booking</button>
                                                    )}
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
            <RefreshModal show={modalShow} onHide={() => setModalShow(false)} onContinue={handleContinue} onCancel={handleCancel} />
            <ModalComponent show={modalConfig.show} title={modalConfig.title} message={modalConfig.message} imageSrc={modalConfig.imageSrc} redirectUrl={modalConfig.redirectUrl} />
        </div>
    );
}

export default BookingDetailsComponents;