import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
};

const titleStyle: React.CSSProperties = {
  fontSize: 86,
  fontWeight: "bold",
  color: "#0db7ed",
  fontFamily: "system-ui, -apple-system, sans-serif",
  textAlign: "center",
  marginBottom: 40,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 48,
  color: "#ffffff",
  fontFamily: "system-ui, -apple-system, sans-serif",
  textAlign: "center",
  opacity: 0.9,
  paddingLeft: 100,
  paddingRight: 120,
  paddingTop: 40,
  paddingBottom: 100,
  lineHeight: 1.4,
};

export const OutroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const subtitleOpacity = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill style={containerStyle}>
      <h1
        style={{
          ...titleStyle,
          transform: `scale(${titleScale})`,
        }}
      >
        🐳 Cảm ơn bạn đã xem!
      </h1>
      <p
        style={{
          ...subtitleStyle,
          opacity: subtitleOpacity,
        }}
      >
        Hãy bắt đầu với Docker ngay hôm nay
      </p>
    </AbsoluteFill>
  );
};

