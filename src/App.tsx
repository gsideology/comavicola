import React, { useState } from 'react';
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

  return (
    <div className="app">
      <Screensaver isActive={showScreensaver} onStart={handleStart} />
      {!showScreensaver && !showThankYou && (
        <BookingForm onSubmitSuccess={handleBookingSuccess} />
      )}
      {showThankYou && <ThankYou />}
    </div>
  );
}

export default App;
