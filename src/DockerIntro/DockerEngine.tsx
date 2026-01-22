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

const featureStyle: React.CSSProperties = {
  fontSize: 34,
  color: "#ffffff",
  fontFamily: "system-ui, -apple-system, sans-serif",
  textAlign: "left",
  marginTop: 16,
  lineHeight: 1.6,
};

export const DockerEngine: React.FC = () => {
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
        ⚙️ Docker Engine
      </h2>
      <p
        style={{
          ...descriptionStyle,
          opacity: contentOpacity,
        }}
      >
        Docker Engine là runtime và công cụ để build và quản lý containers.
        Nó bao gồm Docker daemon, Docker CLI, và các APIs để quản lý containers.
      </p>
      <div
        style={{
          ...boxStyle,
          opacity: contentOpacity,
          transform: `scale(${boxScale})`,
        }}
      >
        <div style={featureStyle}>• Docker Daemon: Chạy containers và quản lý images</div>
        <div style={featureStyle}>• Docker CLI: Giao diện dòng lệnh để tương tác với Docker</div>
        <div style={featureStyle}>• REST API: API để quản lý Docker từ xa</div>
        <div style={featureStyle}>• Container Runtime: Công nghệ để chạy containers (containerd)</div>
      </div>
    </AbsoluteFill>
  );
};

