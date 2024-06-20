import z from "zod";
import { authDto } from "@/auth/interfaces/dto/AuthDto";

export const registerDto = authDto.extend({
	confirmPassword: z.string()
})
	.refine((obj) => obj.password === obj.confirmPassword, { path: ["confirmPassword"], message: "Password and confirm password must be the same." });

export type RegisterDto = z.infer<typeof registerDto>
