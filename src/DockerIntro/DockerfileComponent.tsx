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
  fontFamily: "monospace",
  fontSize: 40,
  color: "#0db7ed",
  textAlign: "left",
  width: "100%",
  maxWidth: 840,
};

export const DockerfileComponent: React.FC = () => {
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
        📝 Dockerfile
      </h2>
      <p
        style={{
          ...descriptionStyle,
          opacity: contentOpacity,
        }}
      >
        Dockerfile là một file text chứa các instructions để build một Docker Image.
        Nó định nghĩa từng bước để tạo ra môi trường chạy ứng dụng của bạn.
      </p>
      <div
        style={{
          ...boxStyle,
          opacity: contentOpacity,
          transform: `scale(${boxScale})`,
        }}
      >
        <div style={{ marginBottom: 12 }}>FROM node:18</div>
        <div style={{ marginBottom: 12 }}>WORKDIR /app</div>
        <div style={{ marginBottom: 12 }}>COPY package*.json .</div>
        <div style={{ marginBottom: 12 }}>RUN npm install</div>
        <div style={{ marginBottom: 12 }}>COPY . .</div>
        <div style={{ marginBottom: 12 }}>EXPOSE 3000</div>
        <div>CMD ["npm", "start"]</div>
      </div>
    </AbsoluteFill>
  );
};

