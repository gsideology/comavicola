import React from 'react';
import FishAnimation from './FishAnimation';

interface ScreensaverProps {
  isActive: boolean;
  onStart: () => void;
}

const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onStart }) => {
  return (
    <div className={`screensaver ${isActive ? 'active' : ''}`}>
      <div className="screensaver-content">
        <div className="logo-container">
          <span className="logo-text">COMAVICOLA</span>
          <span className="logo-year">1956</span>
        </div>
        <FishAnimation isActive={isActive} />
        <button className="screensaver-button" onClick={onStart}>
          clicca qui
        </button>
      </div>
    </div>
  );
};

export default Screensaver; 