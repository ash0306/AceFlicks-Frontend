import React, { useEffect, useState } from 'react';
import NavBarComponent from '../HeaderComponents/NavBarComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import tickets from '../../assets/images/tickets.png';
import popcorn from '../../assets/images/popcorn.png';

function BookingConfirmationComponent() {
    const location = useLocation();
    const { bookingDetails, showtime } = location.state || {};
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!showtime || !bookingDetails) {
            navigate(-1);
        } else if (bookingDetails.offerMessage) {
            setMessage(bookingDetails.offerMessage);
            setShow(true);
        }

        console.log("confirm showtime - " + showtime);
        console.log("confirm bookingDetails - " + bookingDetails);
    }, [bookingDetails, showtime, navigate]);

    const handleClose = () => setShow(false);

    return (
        <div className='home-container'>
            <NavBarComponent />
            <div className="container p-3" id="div-content">
                <div className="row">
                    <div className="col-12">
                        <h1 className="fw-bold"><span className='color-font'>Yay!!</span> Booking Confirmed!!</h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 order-md-1 order-2">
                        <div className="card shadow rounded-xl">
                            <div className='card-body'>
                                <h2 className="card-title">Your Booking Details</h2>
                                <p>Movie: {showtime.movie}</p>
                                <p>Theatre: {showtime.theatre} - {showtime.theatreLocation}</p>
                                <p>Seats: {bookingDetails.seats.join(', ')}</p>
                                <p>Date: {new Date(showtime.startTime).toLocaleDateString('en-GB')}</p>
                                <p>Time: {new Date(showtime.startTime).toLocaleTimeString()} - {new Date(showtime.endTime).toLocaleTimeString()}</p>
                                <button className="btn color-bg btn-block" id='color-btn' onClick={() => navigate('/')}>Back to Home</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 order-md-2 order-1 d-flex justify-content-center py-3" data-aos="fade-left">
                        <img src={tickets} style={{ height: '300px' }} alt="confirmed" />
                    </div>
                </div>
            </div>

            <Modal show={show} centered onHide={handleClose}>
                <Modal.Header className="d-flex justify-content-between align-items-center">
                    <Modal.Title>Offer!!</Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img src={popcorn} alt="modal" className="img-fluid mb-3" style={{ height: '300px' }} />
                    <p>{message}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BookingConfirmationComponent;