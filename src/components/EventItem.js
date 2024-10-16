import React from 'react';

const EventItem = ({ event, onBook, onSelect }) => {
  const handleBookClick = (e) => {
    e.stopPropagation(); // Prevent triggering the onSelect
    if (event.availableSeats > 0) {
      onBook(event.id);
    } else {
      alert("This event is fully booked.");
    }
  };

  return (
    <div className="event-item" onClick={() => onSelect(event.id)}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Available Seats:</strong> {event.availableSeats}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      <button onClick={handleBookClick} disabled={event.availableSeats === 0}>
        {event.availableSeats > 0 ? 'Book Ticket' : 'Fully Booked'}
      </button>
    </div>
  );
};

export default EventItem;
