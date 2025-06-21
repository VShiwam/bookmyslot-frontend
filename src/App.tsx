import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateEvent from './pages/CreateEvent';
import EventDetailsPage from './pages/EventDetailsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* 👈 Add this */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        {/* Optional route to implement later */}
        {/* <Route path="/my-bookings" element={<MyBookingsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
