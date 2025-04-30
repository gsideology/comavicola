import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import $ from 'jquery';
import 'jquery.ripples';

interface ScreensaverProps {
  isActive: boolean;
  onStart: (language: 'it' | 'en') => void;
}

const Screensaver: React.FC<ScreensaverProps> = ({ isActive, onStart }) => {
  const [isWaving, setIsWaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container && isActive) {
      try {
        $(container).ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
          interactive: true,
          crossOrigin: 'anonymous'
        });
      } catch (error) {
        console.warn('Ripples effect not supported on this device:', error);
      }
    }

    return () => {
      if (container) {
        try {
          $(container).ripples('destroy');
        } catch (error) {
          console.warn('Error destroying ripples:', error);
        }
      }
    };
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isActive) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Video autoplay failed:', error);
          });
        }
      } else {
        video.pause();
      }
    }
  }, [isActive]);

  const handleInteraction = (language: 'it' | 'en') => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isWaving) {
      setIsWaving(true);
      setTimeout(() => {
        onStart(language);
        setIsWaving(false);
      }, 1500);
    }
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
        preload="auto"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="screensaver-content">
        <div className="logo-container">
         
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
        <div className="language-buttons">
          <button 
            className="screensaver-button" 
            onClick={handleInteraction('it')}
            onTouchStart={handleInteraction('it')}
          >
            Italiano
          </button>
          <button 
            className="screensaver-button" 
            onClick={handleInteraction('en')}
            onTouchStart={handleInteraction('en')}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};

export default Screensaver; 