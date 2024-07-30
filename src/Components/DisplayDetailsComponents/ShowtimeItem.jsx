import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ShowtimeItem = ({ showtime, index }) => {
    const navigate = useNavigate();
    
    const handleBookTickets = (showtime) =>{
        navigate('/seats', { state: { showtime: showtime } });
    }

    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">Showtime {index + 1}</h5>
                <p className="card-text"><strong>Date:</strong> {new Date(showtime.startTime).toLocaleDateString()}</p>
                <p className="card-text"><strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleTimeString()}</p>
                <p className="card-text"><strong>End Time:</strong> {new Date(showtime.endTime).toLocaleTimeString()}</p>
                <p className="card-text"><strong>Available Seats:</strong> {showtime.availableSeats}</p>
                <p className="card-text"><strong>Ticket Price:</strong> Rs. {showtime.ticketPrice}</p>
                <p className="card-text"><strong>Status:</strong> {showtime.status}</p>
                <button className="btn color-bg text-white" id='color-btn' onClick={() => handleBookTickets(showtime)}>Book Tickets</button>
            </div>
        </div>
    );
};

export default ShowtimeItem;