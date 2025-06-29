import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './page/Main';
import ReservationPage from './page/Reservation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.slice(1); // Remove leading /
      setCurrentPage(path || 'home');
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // Set initial page

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Navigation was done in a primitive way, could use a context or react-router
  return (
    <div className='container'>
      <Header />
      {currentPage === 'home' && <MainPage />}
      {currentPage === 'reservation' && <ReservationPage />}
      <Footer />
    </div>
  );
}

export default App;
