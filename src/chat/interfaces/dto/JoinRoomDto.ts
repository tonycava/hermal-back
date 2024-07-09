import z from "zod";

export const joinGroupDto = z.string();

export type JoinGroupDto = z.infer<typeof joinGroupDto>;
