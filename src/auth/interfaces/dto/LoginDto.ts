import z from "zod";
import { authDto } from "@/auth/interfaces/dto/AuthDto";

export const loginDto = authDto.extend({});

export type LoginDto = z.infer<typeof loginDto>