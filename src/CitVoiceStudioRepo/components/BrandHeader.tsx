import React from "react";

export const BrandHeader: React.FC<{ channelName: string }> = ({ channelName }) => (
  <div style={{ position: "absolute", top: 150, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", border: "2px solid #54f0ca60", borderRadius: 50, padding: "17px 30px", fontSize: 30, fontWeight: 900, letterSpacing: 4 }}>
    ⚡ {channelName}
  </div>
);
