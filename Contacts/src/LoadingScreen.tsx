import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  duration?: number;
  onFinish?: () => void;
  children?: React.ReactNode; 
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  duration = 3000, 
  onFinish, 
  children 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onFinish) {
        onFinish();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-screen-overlay">
      <div className="loading-screen-content">
        {children || (
          <>
            <div className="spinner" style={{fontFamily: 'sans-serif'}}></div> 
            <p>Cargando...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;