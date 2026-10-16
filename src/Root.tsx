import "./index.css";
import { Composition } from "remotion";
import { DockerExplainer } from "./DockerExplainer/DockerExplainer";
import { dockerExplainerSchema } from "./DockerExplainer/types";
import { DevOpsSysadmin, devOpsSysadminDuration } from "./DevOpsSysadmin/DevOpsSysadmin";
import { devOpsSysadminSchema } from "./DevOpsSysadmin/types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="DevOpsSysadmin" component={DevOpsSysadmin} durationInFrames={devOpsSysadminDuration} fps={30} width={1080} height={1920} schema={devOpsSysadminSchema} defaultProps={{ channelName: process.env.CHANNEL_NAME || "CƯỜNG IT" }} />
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
          title: "Docker là gì?",
          subtitle: "Giải thích trong 50 giây",
        }}
      />
    </>
  );
};
