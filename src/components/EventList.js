import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events, onBook, onSelect }) => {
  return (
    <div className="event-list">
      {events.map(event => (
        <EventItem key={event.id} event={event} onBook={onBook} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default EventList;
