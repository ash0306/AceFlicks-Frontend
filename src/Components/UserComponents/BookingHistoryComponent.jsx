import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utilities/axiosConfig';
import NavBarComponent from '../HeaderComponents/NavBarComponent';
import { Link } from 'react-router-dom';
import bookingHistory from '../../assets/images/bookingHistory.png';
import ToastNotification from '../NotificationComponents/ToastNotification';

function BookingHistoryComponent() {
    const { userId } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });
    const [resendLoading, setResendLoading] = useState({}); // New state for resend email loading

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

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axiosInstance.get(`/bookings/user/${userId}`, { withCredentials: true });
                const sortedbookings = response.data.sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
                setBookings(sortedbookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to fetch bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleResendEmail = async (bookingId) => {
        setResendLoading((prevState) => ({ ...prevState, [bookingId]: true })); // Set loading state for the specific booking
        await axiosInstance.post(`/bookings/resend-email?bookingId=${bookingId}`, {}, {
            withCredentials: true,
            timeout: 60000,
        })
            .then(response => {
                newToast('bg-success', 'Email with booking details has been sent successfully!');
            })
            .catch(error => {
                console.error('Error resending email:', error);
                newToast('bg-danger', 'Failed to resend email with booking details');
            })
            .finally(() => {
                setResendLoading((prevState) => ({ ...prevState, [bookingId]: false })); // Set loading state to false for the specific booking
            });
    }

    const isShowtimeInFuture = (showtime) => {
        const [day, month, year] = showtime.replace('Show Start Time: ', '').split('-');
        const showtimeDate = new Date(`${month}/${day}/${year}`);
        return showtimeDate > new Date();
    };

    return (
        <div className='home-container'>
            <NavBarComponent />
            <div className="container p-3" id="div-content">
                <div className="row" data-aos="fade-right">
                    <div className="col-12">
                        <h1 className="fw-bold"><span className='color-font'>Your</span> Bookings</h1>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-md-6 order-md-1 order-2">
                        <div className="accordion shadow rounded-xl" id="accordionOrders" data-aos="fade-right">
                            {loading && <div>Loading...</div>}
                            {error &&
                                <div>
                                    <h3>It looks like you haven't made any bookings yet...</h3>
                                    <p>Browse our selection of movies and showtimes to find the perfect film for your next outing. Dive into our listings, and book your seats for an unforgettable cinematic experience!</p>
                                    <div className='btn color-bg' id='color-btn'><Link to='/' className='text-decoration-none text-white'>Browse</Link></div>
                                </div>
                            }
                            {!loading && !error && (
                                <div className="accordion" id="accordionOrders">
                                    {bookings.map((booking) => (
                                        <div key={booking.id} className="accordion-item">
                                            <h2 className="accordion-header" id={`heading${booking.id}`}>
                                                <button
                                                    className="accordion-button"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${booking.id}`}
                                                    aria-expanded="true"
                                                    aria-controls={`collapse${booking.id}`}
                                                >
                                                    Booking ID: {booking.id}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${booking.id}`}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={`heading${booking.id}`}
                                                data-bs-parent="#accordionOrders"
                                            >
                                                <div className="accordion-body">
                                                    <ul className="list-group">
                                                        <li className="list-group-item"><strong>Movie: </strong>{booking.showtimeDetails[1].replace('Movie: ', '')}</li>
                                                        <li className="list-group-item"><strong>Theatre: </strong>{booking.showtimeDetails[2].replace('Theatre: ', '')}</li>
                                                        <li className="list-group-item"><strong>Show Start Time: </strong>{booking.showtimeDetails[0].replace('Show Start Time: ', '')}</li>
                                                        <li className="list-group-item"><strong>Total Price: </strong>Rs.{booking.totalPrice.toFixed(2)}</li>
                                                        <li className="list-group-item"><strong>Seats: </strong>{booking.seats.length > 0 ? booking.seats.join(', ') : 'None'}</li>
                                                        {isShowtimeInFuture(booking.showtimeDetails[0]) && (
                                                            <button className='btn color-bg mt-2' id='color-btn' onClick={() => handleResendEmail(booking.id)}>
                                                                {resendLoading[booking.id] ? (
                                                                    <div className="spinner-border spinner-border-sm" role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                                ) : (
                                                                    'Resend Ticket'
                                                                )}
                                                            </button>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6 order-md-2 order-1 d-flex justify-content-center py-3" data-aos="fade-left">
                        <img src={bookingHistory} style={{ height: '380px' }} alt="orders" />
                    </div>
                </div>
            </div>
            <ToastNotification classBackground={toastConfig.classBackground} message={toastConfig.message} show={toastConfig.show} onClose={closeToast} />
        </div>
    );
}

export default BookingHistoryComponent;