import React from 'react';

export default function Countdown({ timeLeft, onPreview }) {
  // Format numbers to always have 2 digits (e.g. 05)
  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <div className="my-auto w-100 text-center">
      {/* Days Badge */}
      <div className="mb-4">
        <span className="badge bg-warning bg-opacity-20 text-warning px-3 py-2 rounded-pill fs-6 border border-warning border-opacity-25">
          {timeLeft.days} {timeLeft.days === 1 ? 'DAY' : 'DAYS'} REMAINING
        </span>
      </div>

      {/* Main 00:00:00 Display */}
      <div className="p-4 bg-white bg-opacity-10 rounded-4 border border-light border-opacity-25 shadow-lg mx-auto" style={{ maxWidth: '320px' }}>
        <div className="h1 fw-bold text-white mb-1 font-monospace tracking-widest">
          {formatNum(timeLeft.hours)} : {formatNum(timeLeft.minutes)} : {formatNum(timeLeft.seconds)}
        </div>
        <div className="d-flex justify-content-between text-uppercase small text-light opacity-75 px-3">
          <span>HRS</span>
          <span>MIN</span>
          <span>SEC</span>
        </div>
      </div>

      {/* Dev Override Preview Button */}
      <button 
        onClick={onPreview}
        className="btn btn-link text-light text-decoration-none opacity-50 d-block mx-auto mt-4 small"
      >
        (Preview Birthday Cake)
      </button>
    </div>
  );
}