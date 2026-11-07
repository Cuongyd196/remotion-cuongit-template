import React from "react";

export const BrandHeader: React.FC<{ channelName: string }> = ({ channelName }) => (
  <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
    <div style={{ whiteSpace: "nowrap", fontSize: 30, fontWeight: 800, letterSpacing: 2, padding: "12px 34px", border: "2px solid #54f0ca80", borderRadius: 999, background: "#0a1a26" }}>⚡ {channelName}</div>
  </div>
);
