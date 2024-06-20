import { Context, Next } from "hono";
import { RegisterUseCase } from "@/auth/usecases/RegisterUseCase";
import { RegisterDto } from "@/auth/interfaces/dto/RegisterDto";
import { SqliteAdapter } from "@/auth/repositories/SqliteAdapter";

export const RegisterController = async (c: Context, next: Next) => {
	const body = await c.req.json<RegisterDto>()
	 const result = await RegisterUseCase(body, SqliteAdapter())

	if (!result.isSuccess) return c.json(result, result.status);

	await next();
	return;
}