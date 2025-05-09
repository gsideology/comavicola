import React, { useState, useEffect } from 'react';
import Screensaver from './components/Screensaver';
import BookingForm from './components/BookingForm';
import BookingFormEN from './components/BookingFormEN';
import ThankYou from './components/ThankYou';
import './App.css';

function App() {
  const [showScreensaver, setShowScreensaver] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [language, setLanguage] = useState<'it' | 'en'>('it');

  const handleStart = (selectedLanguage: 'it' | 'en') => {
    setLanguage(selectedLanguage);
    setShowScreensaver(false);
  };

  const handleGoBack = () => {
    setShowScreensaver(true);
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
        <div style={{ position: 'relative', zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {language === 'it' ? (
            <BookingForm onSubmitSuccess={handleBookingSuccess} onGoBack={handleGoBack} />
          ) : (
            <BookingFormEN onSubmitSuccess={handleBookingSuccess} onGoBack={handleGoBack} />
          )}
        </div>
      )}
      {showThankYou && <ThankYou />}
    </div>
  );
}

export default App;
