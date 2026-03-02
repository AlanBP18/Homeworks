
import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen'
import './App.css'
import ContactList from './array';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = setTimeout(() => {
      setDataLoaded(true);
    }, 1500);

    return () => clearTimeout(fetchData);
  }, []);

  const handleLoadingFinish = () => {
    setShowLoading(false);
  };

  return (
    <>
      {showLoading && <LoadingScreen duration={3000} onFinish={handleLoadingFinish} />}

      {!showLoading && (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'left' }}>
          <h1 style={{ padding: '0 20px', fontFamily: 'sans-serif' }}>
            Contactos
          </h1>
          <ContactList />
        </div>
      )}
    </>
  );
}

export default App;

