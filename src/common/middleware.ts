import { ZodError, ZodSchema } from "zod";
import { Context, Next } from "hono";
import { Socket } from "socket.io";

type MiddlewareFunction = {
	(body: unknown, schema: ZodSchema): void
}

export const DefaultMiddleware: MiddlewareFunction = (body, schema) => {
	return schema.parse(body);
}

export const WsMiddleware = (socket: Socket, data: unknown, schema: ZodSchema, middleware = DefaultMiddleware) => {
	try {
		middleware(data, schema)
		return true
	} catch (error) {
		socket.emit("error:message", error);
		return false;
	}
}

export const CheckBodyMiddleware = async (c: Context, next: Next, schema: ZodSchema, middleware = DefaultMiddleware) => {
	try {
		const body = await c.req.json<unknown>()
		middleware(body, schema)
		await next();
	} catch (error) {
		if (error instanceof ZodError) {

			const formattedErrors: { [key: string]: string } = {};

			error.errors.forEach((err) => {
				const path = err.path.join(".");
				formattedErrors[path] = err.message;
			});

			return c.json({ status: 400, message: "Not well formated body", data: formattedErrors }, 400);
		}
		return c.json({ status: 400, message: "Internal Server Error", data: null }, 500);
	}
}
