import React from 'react';

const ShowtimeItem = ({ showtime }) => (
  <div>
    <h5>Showtime</h5>
    <li className="mb-2">
      <strong>Start Time:</strong> {new Date(showtime.startTime).toLocaleTimeString()} <br />
      <strong>End Time:</strong> {new Date(showtime.endTime).toLocaleTimeString()} <br />
      <strong>Available Seats:</strong> {showtime.availableSeats} <br />
      <strong>Ticket Price:</strong> Rs. {showtime.ticketPrice} <br />
      <strong>Status:</strong> {showtime.status} <br />
    </li>
  </div>
);

export default ShowtimeItem;