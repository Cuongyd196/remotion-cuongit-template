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
  fontSize: 100,
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
  width: "100%",
  maxWidth: 840,
};

const codeStyle: React.CSSProperties = {
  fontSize: 48,
  color: "#0db7ed",
  fontFamily: "monospace",
  textAlign: "center",
  marginTop: 16,
};

export const DockerImage: React.FC = () => {
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
        📦 Docker Images
      </h2>
      <p
        style={{
          ...descriptionStyle,
          opacity: contentOpacity,
        }}
      >
        Docker Image là một template read-only được sử dụng để tạo ra containers.
        Nó chứa tất cả các dependencies, libraries, và code cần thiết để chạy một ứng dụng.
      </p>
      <div
        style={{
          ...boxStyle,
          opacity: contentOpacity,
          transform: `scale(${boxScale})`,
        }}
      >
        <p style={{ color: "#ffffff", fontSize: 36, marginBottom: 12, fontWeight: "600" }}>
          Ví dụ các lệnh phổ biến:
        </p>
        <div style={codeStyle}>docker pull ubuntu:latest</div>
        <div style={codeStyle}>docker build -t myapp:1.0 .</div>
        <div style={codeStyle}>docker images</div>
      </div>
    </AbsoluteFill>
  );
};

