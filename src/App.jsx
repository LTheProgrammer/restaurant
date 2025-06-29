import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './page/Main';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => setCurrentPage(page);

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Set initial page

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation was done in a primitive way, could use a context or react-router
  return (
    <div className='container'>
      <Header navigate={navigate} />
      {currentPage === 'home' && <Main navigate={navigate} />}
      {/*currentPage === 'reservation' && <ReservationPage />*/}
      <Footer />
    </div>
  );
}

export default App;
