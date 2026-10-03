import React from 'react';

export default function SiteLogo({ compact = false }) {
  return (
    <span className={`site-logo ${compact ? 'site-logo-compact' : ''}`} aria-label="Meiko Labs">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img">
          <path d="M18 6h12v4l-2 1v8.4l9.2 15.8A4 4 0 0 1 33.8 41H14.2a4 4 0 0 1-3.4-5.8L20 19.4V11l-2-1V6Z" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round" />
          <path d="M15.5 31h17l3.2 5.6a1.6 1.6 0 0 1-1.4 2.4H13.7a1.6 1.6 0 0 1-1.4-2.4L15.5 31Z" fill="currentColor" opacity="0.32" />
          <path d="M18 27c3 1.6 5 1.6 8 0 2.7-1.4 4.9-1.4 7.5 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="logo-text-wrap">
        <span className="logo-text">Meiko Labs</span>
        {!compact && <span className="logo-tagline">Precision for every bench</span>}
      </span>
    </span>
  );
}
