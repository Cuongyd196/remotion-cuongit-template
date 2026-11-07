import { z } from "zod";

export const embedGoogleDriveVideoSchema = z.object({
  channelName: z.string(),
});
