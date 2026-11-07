import { z } from "zod";

export const devVsDevopsSchema = z.object({ channelName: z.string() });
export type DevVsDevopsProps = z.infer<typeof devVsDevopsSchema>;
