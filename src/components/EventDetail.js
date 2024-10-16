import React from 'react';

const EventDetail = ({ event }) => {
  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Available Seats:</strong> {event.availableSeats}</p>
      <p><strong>Price:</strong> ${event.price}</p>
    </div>
  );
};

export default EventDetail;
