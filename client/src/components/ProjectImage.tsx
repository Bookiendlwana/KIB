import React, { useState } from "react";

interface ProjectImageProps {
  src?: string;
  alt: string;
}

const FALLBACK_SRC = "";

export default function ProjectImage({ src, alt }: ProjectImageProps) {
  // Use the src directly, as it now points to /projects/... or /attached_assets/... in /public
  return (
    <div className="flex items-center justify-center w-full bg-white rounded-md" style={{ minHeight: '12rem', maxHeight: '16rem', height: '100%' }}>
      <img
        src={src}
        alt={alt}
        className="max-h-64 w-auto object-contain"
        style={{ display: 'block', background: 'transparent', margin: '0 auto' }}
      />
    </div>
  );
}