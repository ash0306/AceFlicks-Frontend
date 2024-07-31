import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axiosInstance from '../../utilities/axiosConfig';
import NavBarComponent from '../HeaderComponents/NavBarComponent';
import { Link } from 'react-router-dom';
import bookingHistory from '../../assets/images/bookingHistory.png';

function BookingHistoryComponent() {
    const { userId } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axiosInstance.get(`/bookings/user/${userId}`,{ withCredentials: true});
                const sortedOrders = response.data.sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
                setOrders(sortedOrders);
                console.log(sortedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

  return (
    <div className='home-container'>
        <NavBarComponent/>
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
                            <p>Browse our selection of movies and showtimes to find the perfect film for your next outing. Dive into our listings, choose your favorites, and book your seats for an unforgettable cinematic experience!</p>
                            <div className='btn color-bg' id='color-btn'><Link to='/' className='text-decoration-none text-white'>Browse</Link></div>
                        </div>
                        }
                         {!loading && !error && (
                            <div className="accordion" id="accordionOrders">
                                {orders.map((order) => (
                                    <div key={order.id} className="accordion-item">
                                        <h2 className="accordion-header" id={`heading${order.id}`}>
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${order.id}`}
                                                aria-expanded="true"
                                                aria-controls={`collapse${order.id}`}
                                            >
                                                Order ID: {order.id}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${order.id}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`heading${order.id}`}
                                            data-bs-parent="#accordionOrders"
                                        >
                                            <div className="accordion-body">
                                                <ul className="list-group">
                                                    <li className="list-group-item"><strong>Movie: </strong>{order.showtimeDetails[1].replace('Movie: ', '')}</li>
                                                    <li className="list-group-item"><strong>Theatre: </strong>{order.showtimeDetails[2].replace('Theatre: ', '')}</li>
                                                    <li className="list-group-item"><strong>Show Start Time: </strong>{order.showtimeDetails[0].replace('Show Start Time: ', '')}</li>
                                                    <li className="list-group-item"><strong>Total Price: </strong>${order.totalPrice.toFixed(2)}</li>
                                                    <li className="list-group-item"><strong>Seats: </strong>{order.seats.length > 0 ? order.seats.join(', ') : 'None'}</li>
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
    </div>
  )
}

export default BookingHistoryComponent