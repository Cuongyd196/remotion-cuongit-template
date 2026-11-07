import React from "react";
import { SceneProps } from "../components/SceneShell";
import { SideProfile } from "../components/SideProfile";
import { colorB } from "../theme";

export const Scene4B: React.FC<SceneProps> = (props) => (
  <SideProfile {...props} color={colorB} definition={"Văn hóa làm việc, và là\nvị trí DevOps Engineer"} mainWork="Phát hành, hạ tầng, tự động hóa" challenge="Kỹ năng trải rộng cả hai phía" />
);
