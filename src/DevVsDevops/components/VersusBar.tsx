import React from "react";
import { colorA, colorB, nameA, nameB } from "../theme";

export const VersusBar: React.FC<{ opacityA: number; opacityB: number }> = ({ opacityA, opacityB }) => (
  <div style={{ position: "absolute", top: 250, left: 88, right: 88, height: 120, display: "flex", alignItems: "center" }}>
    <div style={{ flex: 1, textAlign: "center", whiteSpace: "nowrap", fontSize: 60, fontWeight: 900, color: colorA, opacity: opacityA }}>{nameA}</div>
    <div style={{ width: 90, height: 90, flexShrink: 0, borderRadius: 45, background: "#ffffff14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900 }}>VS</div>
    <div style={{ flex: 1, textAlign: "center", whiteSpace: "nowrap", fontSize: 60, fontWeight: 900, color: colorB, opacity: opacityB }}>{nameB}</div>
  </div>
);
