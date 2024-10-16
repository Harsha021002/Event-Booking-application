import React, { useState, useEffect, useMemo } from 'react';
import EventList from './components/EventList';
import Pagination from './components/Pagination';
import Login from './components/Login';
import EventDetail from './components/EventDetail';
import Filter from './components/Filter';
import { events } from './data';

const App = () => {
  const [eventData, setEventData] = useState(events);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [user, setUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEventData(events); // Use mock data
      } catch (err) {
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBook = (id) => {
    setEventData(prevEvents =>
      prevEvents.map(event => 
        event.id === id && event.availableSeats > 0 
          ? { ...event, availableSeats: event.availableSeats - 1 } 
          : event
      )
    );
  };

  const handleLogin = (username) => {
    setUser(username);
  };

  const filteredEvents = useMemo(() => {
    return eventData.filter(event => 
      (selectedCategory ? event.category === selectedCategory : true)
    );
  }, [eventData, selectedCategory]);

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = useMemo(() => filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent), [filteredEvents, indexOfFirstEvent, indexOfLastEvent]);

  return (
    <div className="app">
      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>}
      {user ? (
        <>
          <h1>Welcome, {user}</h1>
          {selectedEvent ? (
            <EventDetail event={eventData.find(event => event.id === selectedEvent)} />
          ) : (
            <>
              <Filter 
                categories={[...new Set(eventData.map(event => event.category))]} 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
              />
              <EventList events={currentEvents} onBook={handleBook} onSelect={setSelectedEvent} />
              <Pagination 
                totalItems={filteredEvents.length} 
                itemsPerPage={itemsPerPage} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
              />
            </>
          )}
          <button onClick={() => setSelectedEvent(null)}>Back to Events</button>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
