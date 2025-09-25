import React from "react";

export default function HomeBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: `linear-gradient(rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.3)), url('/attached_assets/WhatsApp_Image_2025_09_02_at_17.48.21_1757324896683.jpeg')`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      {children}
    </div>
  );
}
