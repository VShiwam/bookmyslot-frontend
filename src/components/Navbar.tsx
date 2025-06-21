import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">BookMySlot</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/create" className="hover:text-gray-200">Create Event</Link>
          <Link to="/my-bookings" className="hover:text-gray-200">My Bookings</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
