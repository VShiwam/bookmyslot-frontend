import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Slot = {
  time: string;
  max_bookings: number;
};

type Event = {
  id: number;
  title: string;
  description: string;
  slots: Slot[];
};

function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Failed to load events:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">📅 Upcoming Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-600">No events created yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow p-4 rounded">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Slots: {event.slots.length} | First Slot:{' '}
                {event.slots[0] ? new Date(event.slots[0].time).toLocaleString() : 'N/A'}
              </p>
              <Link
                to={`/events/${event.id}`}
                className="mt-2 inline-block text-blue-600 hover:underline font-medium"
              >
                ➡️ View & Book
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
