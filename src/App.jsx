import React, { useState, useEffect } from 'react';
import Countdown from './components/Countdown';
import CakeSection from './components/CakeSection';
import LetterEnvelope from './components/LetterEnvelope';
import Fireworks from './components/Fireworks';

// Importing local image from assets
import surpriseImage from './assets/photo.jpg'; 

const RECIPIENT_NAME = "My Love";
const LETTER_MESSAGE = `To my favorite person in the world,

Happy Birthday! ❤️

Having you in my life is the greatest blessing I could ever ask for. Every day with you is filled with so much warmth, laughter, and happiness. 

Thank you for being my rock, my safe space, and my best friend. I hope this year brings you all the love, joy, and success that you bring into my life every single day.

I love you more than words can say! Enjoy your special day! ✨`;

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTargetReached, setIsTargetReached] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  // Countdown timer to September 16
  // Change this block inside the useEffect in App.jsx:
useEffect(() => {
  const calculateTimeLeft = () => {
    const now = new Date();

    // SET TO NOW: Triggers the cake immediately
    const targetDate = new Date(); 

    const diff = targetDate - now;

    if (diff <= 0) {
      setIsTargetReached(true);
    } else {
      setIsTargetReached(false);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
  };

  calculateTimeLeft();
  const timer = setInterval(calculateTimeLeft, 1000);
  return () => clearInterval(timer);
}, []);

  // 5-second delay after candle blow to unlock scroll and prompt user
  const handleCandleBlow = () => {
    setCandlesBlown(true);
    setTimeout(() => {
      setShowScrollPrompt(true);
    }, 5000);
  };

  return (
    <div className={`app-frame text-white w-100 position-relative ${!showScrollPrompt ? 'scroll-locked' : ''}`}>
      
      {/* Night Sky Stars */}
      <div className="star-field"></div>

      {/* Abstract & Heart Fireworks */}
      {candlesBlown && <Fireworks />}

      {/* SECTION 1: Countdown or Cake View */}
      <div className="snap-screen">
        <div className="text-center mt-3 z-1">
          <h1 className="h4 fw-bold text-uppercase text-warning mb-1">
            {isTargetReached ? "HAPPY BIRTHDAY!" : "THE COUNTDOWN"}
          </h1>
          <p className="small text-light opacity-75">
            {isTargetReached ? "Make a wish and blow out the candle!" : "Waiting for September 16th..."}
          </p>
        </div>

        {!isTargetReached ? (
          <Countdown timeLeft={timeLeft} onPreview={() => setIsTargetReached(true)} />
        ) : (
          <CakeSection 
            recipientName={RECIPIENT_NAME} 
            imageUrl={surpriseImage} 
            candlesBlown={candlesBlown} 
            onBlow={handleCandleBlow} 
          />
        )}

        {/* Scroll Prompt (Appears after 5 seconds) */}
        <div className={`transition-opacity mb-2 text-center z-1 ${showScrollPrompt ? 'opacity-100' : 'opacity-0'}`}>
          <small className="text-light d-block mb-1 opacity-75">Scroll down for a message</small>
          <div className="text-warning h5 mb-0">↓</div>
        </div>
      </div>

      {/* SECTION 2: Envelope View (Hidden until user blows candle and scrolls down) */}
      {showScrollPrompt && (
        <div className="snap-screen bg-black bg-opacity-40 justify-content-center">
          <LetterEnvelope message={LETTER_MESSAGE} recipientName={RECIPIENT_NAME} />
        </div>
      )}

    </div>
  );
}