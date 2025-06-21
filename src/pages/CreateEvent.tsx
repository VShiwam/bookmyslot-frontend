import { useState } from 'react';

type Slot = {
  time: string;
  maxBookings: number;
};

function CreateEvent() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [slots, setSlots] = useState<Slot[]>([{ time: '', maxBookings: 1 }]);

  const addSlot = () => {
    setSlots([...slots, { time: '', maxBookings: 1 }]);
  };

  const updateSlot = (index: number, field: keyof Slot, value: string | number) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value as never;
    setSlots(updatedSlots);
  };

  // ✅ Fixed: handleSubmit defined only once
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventPayload = {
      title,
      description,
      slots: slots.map((slot) => ({
        time: new Date(slot.time).toISOString(), // ensure UTC ISO format
        max_bookings: slot.maxBookings,
      })),
    };

    try {
      const response = await fetch('http://localhost:8000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      alert('✅ Event created successfully!');
      console.log('Event Created:', data);
    } catch (error) {
      alert('❌ Failed to create event');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create a New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <h3 className="font-medium">Available Time Slots</h3>
        {slots.map((slot, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="datetime-local"
              className="flex-1 border p-2 rounded"
              value={slot.time}
              onChange={(e) => updateSlot(index, 'time', e.target.value)}
              required
            />
            <input
              type="number"
              className="w-28 border p-2 rounded"
              min={1}
              value={slot.maxBookings}
              onChange={(e) => updateSlot(index, 'maxBookings', parseInt(e.target.value))}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSlot} className="text-blue-600 underline">
          + Add another slot
        </button>

        <button type="submit" className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
