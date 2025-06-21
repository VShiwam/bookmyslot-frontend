import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Slot = {
  time: string;
  max_bookings: number;
};

type Event = {
  title: string;
  description: string;
  slots: Slot[];
};

function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch(() => setError('Failed to load event'));
  }, [id]);

  const handleBooking = async () => {
    setError('');
    setStatus(null);
    setMessage('');

    if (!selectedSlot || !name || !email) {
      setError('❌ Please fill all fields');
      setStatus('error');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/events/${id}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          slot_time: selectedSlot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Booking failed');
      }

      setStatus('success');
      setMessage('✅ Booking successful!');
      setName('');
      setEmail('');
      setSelectedSlot('');
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow rounded">
      {event ? (
        <>
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          <p className="mb-4">{event.description}</p>

          <h3 className="font-semibold mb-2">Available Slots</h3>
          <select
            value={selectedSlot}
            onChange={(e) => {
              setSelectedSlot(e.target.value);
              setError('');
              setStatus(null);
              setMessage('');
            }}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">-- Select a slot --</option>
            {[...event.slots]
              .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
              .map((slot, idx) => (
                <option key={idx} value={slot.time}>
                  {new Date(slot.time).toLocaleString()} (Max: {slot.max_bookings})
                </option>
              ))}
          </select>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
                setStatus(null);
              }}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setStatus(null);
              }}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Book Slot
          </button>

          {status === 'success' && (
            <p className="text-green-600 mt-4">{message}</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 mt-4">{error}</p>
          )}
        </>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
}

export default EventDetailsPage;
