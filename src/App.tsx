import React, { useState, useEffect } from 'react';
import Screensaver from './components/Screensaver';
import BookingForm from './components/BookingForm';
import ThankYou from './components/ThankYou';
import './App.css';

function App() {
  const [showScreensaver, setShowScreensaver] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleStart = () => {
    setShowScreensaver(false);
  };

  const handleBookingSuccess = () => {
    setShowThankYou(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showThankYou) {
      timer = setTimeout(() => {
        setShowThankYou(false);
        setShowScreensaver(true);
      }, 5000); // 5 seconds
    }

    return () => clearTimeout(timer);
  }, [showThankYou]);

  return (
    <div className={`app ${(!showScreensaver || showThankYou) ? 'center-content' : ''}`}>
      <Screensaver isActive={showScreensaver} onStart={handleStart} />
      {!showScreensaver && !showThankYou && (
        <div style={{ position: 'relative', zIndex: 200 }}>
          <BookingForm onSubmitSuccess={handleBookingSuccess} />
        </div>
      )}
      {showThankYou && <ThankYou />}
    </div>
  );
}

export default App;
