import React from 'react';
// import FishAnimation from './FishAnimation'; // Remove FishAnimation import

interface ScreensaverProps {
  isActive: boolean;
  onStart: () => void;
}

const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onStart }) => {
  return (
    <div className={`screensaver ${isActive ? 'active' : ''}`}>
      <div className="screensaver-content">
        {/* The logo will be set as the background of this container via CSS */}
        <div className="logo-container">
          {/* Remove old logo text spans */}
          {/* <span className="logo-text">COMAVICOLA</span> */}
          {/* <span className="logo-year">1956</span> */}
        </div>
        {/* Placeholder for the fish image, to be styled with CSS */}
        <div className="fish-image"></div> 
        {/* Remove FishAnimation component */}
        {/* <FishAnimation isActive={isActive} /> */}
        <button className="screensaver-button" onClick={onStart}>
          clicca qui
        </button>
      </div>
    </div>
  );
};

export default Screensaver; 