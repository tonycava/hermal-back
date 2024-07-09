import { Context, Next } from "hono";
import { SqliteAdapter } from "@/auth/repositories/SqliteAdapter";
import { LoginUseCase } from "@/auth/usecases/LoginUseCase";
import { LoginDto } from "@/auth/interfaces/dto/LoginDto";

export const LoginController = async (c: Context, next: Next) => {
	const body = await c.req.json<LoginDto>()
	const result = await LoginUseCase(body, SqliteAdapter())

	return c.json(result, result.status);
}

