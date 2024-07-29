import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ShowtimeItem = ({ showtime, index }) => {
    const navigate = useNavigate();
    
    const handleBookTickets = (showtime) =>{
        // console.log(showtime)
        navigate('/seats', {state:{showtime: showtime}})
    }

    return (    
    <div>
        <h5>Showtime {index + 1}</h5>
        <li className="mb-2">
            <strong>Date:</strong> {new Date(showtime.startTime).toLocaleDateString()} <br/>
            <strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleTimeString()} <br />
            <strong>End Time:</strong> {new Date(showtime.endTime).toLocaleTimeString()} <br />
            <strong>Available Seats:</strong> {showtime.availableSeats} <br />
            <strong>Ticket Price:</strong> Rs. {showtime.ticketPrice} <br />
            <strong>Status:</strong> {showtime.status} <br />
            <button className='btn my-2' style={{backgroundColor: "#FF8225"}} onClick={() => handleBookTickets(showtime)}>Book Tickets</button>
        </li>
    </div>
    )
};

export default ShowtimeItem;