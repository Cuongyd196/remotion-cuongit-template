import React from "react";
import { SceneProps } from "../components/SceneShell";
import { SideProfile } from "../components/SideProfile";
import { colorA } from "../theme";

export const Scene3A: React.FC<SceneProps> = (props) => (
  <SideProfile {...props} color={colorA} definition={"Người thiết kế, viết và\nkiểm thử phần mềm"} mainWork="Biến yêu cầu thành tính năng" challenge="Đúng hạn, đúng chi phí, ít lỗi" />
);
