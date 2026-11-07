import { z } from "zod";

export const citVoiceStudioRepoSchema = z.object({ channelName: z.string() });
export type CitVoiceStudioRepoProps = z.infer<typeof citVoiceStudioRepoSchema>;
