import React, { useState } from "react";

const LOGO_SRC = "/logo.png";
const FALLBACK_SRC = "/favicon.ico";

export default function LogoImage() {
  const [hasFallback, setHasFallback] = useState(false);
  return (
    <img
      src={hasFallback ? FALLBACK_SRC : LOGO_SRC}
      alt="Kanguya Builders Logo"
      className="w-12 h-12 max-w-12 max-h-12 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 border border-navy-primary/20 object-contain bg-white p-1"
      style={{ aspectRatio: '1 / 1', display: 'block' }}
      onError={e => {
        if (!hasFallback) {
          setHasFallback(true);
        }
      }}
    />
  );
}