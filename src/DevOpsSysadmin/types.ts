import { z } from "zod";
export const devOpsSysadminSchema = z.object({ channelName: z.string() });
export type DevOpsSysadminProps = z.infer<typeof devOpsSysadminSchema>;
