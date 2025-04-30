import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import $ from 'jquery';
import 'jquery.ripples';

interface ScreensaverProps {
  isActive: boolean;
  onStart: () => void;
}

const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onStart }) => {
  const [isWaving, setIsWaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (containerRef.current && isActive) {
      $(containerRef.current).ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04,
        interactive: true
      });
    }

    return () => {
      if (containerRef.current) {
        $(containerRef.current).ripples('destroy');
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const handleClick = () => {
    setIsWaving(true);
    setTimeout(() => {
      onStart();
      setIsWaving(false);
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className={`screensaver ${isActive ? 'active' : ''}`}
    >
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="screensaver-content">
        <div className="logo-container">
          <div className="fish-image"></div>
        </div>
        <AnimatePresence>
          {isWaving && (
            <motion.div
              className="wave-container"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="wave"
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ 
                  scale: [0.5, 2, 0.5],
                  opacity: [0.8, 0.2, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <button className="screensaver-button" onClick={handleClick}>
          clicca qui
        </button>
      </div>
    </div>
  );
};

export default Screensaver; 