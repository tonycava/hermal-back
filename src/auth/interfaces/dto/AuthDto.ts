import z from "zod";

export const authDto = z.object({
	email: z.string().email(),
	password: z.string().min(1, "Password must contain at least be 1 character(s)"),
})