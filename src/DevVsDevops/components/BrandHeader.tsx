import React from "react";

export const BrandHeader: React.FC<{ channelName: string }> = ({ channelName }) => (
  <div style={{ position: "absolute", top: 150, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", border: "2px solid #ffffff30", borderRadius: 50, padding: "15px 28px", fontSize: 30, fontWeight: 900, letterSpacing: 4 }}>
    ⚡ {channelName}
  </div>
);
