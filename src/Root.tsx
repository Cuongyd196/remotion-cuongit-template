import "./index.css";
import { Composition } from "remotion";
import { DockerExplainer } from "./DockerExplainer/DockerExplainer";
import { dockerExplainerSchema } from "./DockerExplainer/types";
import { CitVoiceStudioRepo, citVoiceStudioRepoDuration } from "./CitVoiceStudioRepo/CitVoiceStudioRepo";
import { citVoiceStudioRepoSchema } from "./CitVoiceStudioRepo/types";
import { DevVsDevops, devVsDevopsDuration } from "./DevVsDevops/DevVsDevops";
import { devVsDevopsSchema } from "./DevVsDevops/types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="DevVsDevops" component={DevVsDevops} durationInFrames={devVsDevopsDuration} fps={30} width={1080} height={1920} schema={devVsDevopsSchema} defaultProps={{ channelName: process.env.CHANNEL_NAME || "CƯỜNG IT" }} />
      <Composition id="CitVoiceStudioRepo" component={CitVoiceStudioRepo} durationInFrames={citVoiceStudioRepoDuration} fps={30} width={1080} height={1920} schema={citVoiceStudioRepoSchema} defaultProps={{ channelName: process.env.CHANNEL_NAME || "CƯỜNG IT" }} />
      {/* 50s AI Voice Explainer: Docker */}
      <Composition
        id="DockerExplainer"
        component={DockerExplainer}
        durationInFrames={1280}
        fps={30}
        width={1080}
        height={1920}
        schema={dockerExplainerSchema}
        defaultProps={{
          channelName: process.env.CHANNEL_NAME || "CƯỜNG IT",
          title: "Docker là gì?",
          subtitle: "Giải thích trong 50 giây",
        }}
      />
    </>
  );
};
