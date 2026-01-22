import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  paddingTop: 80,
  paddingBottom: 120,
  paddingLeft: 80,
  paddingRight: 120,
};

const titleStyle: React.CSSProperties = {
  fontSize: 86,
  fontWeight: "bold",
  color: "#0db7ed",
  fontFamily: "system-ui, -apple-system, sans-serif",
  textAlign: "center",
  marginBottom: 40,
};

const descriptionStyle: React.CSSProperties = {
  fontSize: 48,
  color: "#ffffff",
  fontFamily: "system-ui, -apple-system, sans-serif",
  textAlign: "center",
  maxWidth: 840,
  lineHeight: 1.5,
  marginBottom: 40,
};

const boxStyle: React.CSSProperties = {
  border: "4px solid #0db7ed",
  borderRadius: 20,
  padding: 40,
  backgroundColor: "rgba(13, 183, 237, 0.1)",
  marginTop: 30,
  fontFamily: "monospace",
  fontSize: 40,
  color: "#0db7ed",
  textAlign: "left",
  width: "100%",
  maxWidth: 840,
};

export const DockerCompose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const contentOpacity = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
  });

  const boxScale = interpolate(
    frame,
    [60, 90],
    [0.8, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={containerStyle}>
      <h2
        style={{
          ...titleStyle,
          opacity: titleOpacity,
        }}
      >
        🎼 Docker Compose
      </h2>
      <p
        style={{
          ...descriptionStyle,
          opacity: contentOpacity,
        }}
      >
        Docker Compose là công cụ để định nghĩa và chạy multi-container Docker applications.
        Sử dụng file YAML để cấu hình các services, networks, và volumes.
      </p>
      <div
        style={{
          ...boxStyle,
          opacity: contentOpacity,
          transform: `scale(${boxScale})`,
        }}
      >
        <div style={{ marginBottom: 12 }}>version: '3.8'</div>
        <div style={{ marginBottom: 12 }}>services:</div>
        <div style={{ marginBottom: 6, marginLeft: 20 }}>web:</div>
        <div style={{ marginBottom: 6, marginLeft: 40 }}>image: nginx</div>
        <div style={{ marginBottom: 6, marginLeft: 40 }}>ports:</div>
        <div style={{ marginBottom: 12, marginLeft: 60 }}>- "80:80"</div>
        <div style={{ marginLeft: 20 }}>db:</div>
        <div style={{ marginLeft: 40 }}>image: postgres</div>
      </div>
    </AbsoluteFill>
  );
};

