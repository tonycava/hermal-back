import { ZodError, ZodSchema } from "zod";
import { Context, Next } from "hono";

type MiddlewareFunction = {
	(body: unknown, schema: ZodSchema): void
}

export const DefaultMiddleware: MiddlewareFunction = (body: unknown, schema: ZodSchema) => {
	return schema.parse(body);
}

export const CheckBodyMiddleware = async (c: Context, next: Next, schema: ZodSchema, middleware = DefaultMiddleware) => {
	try {
		const body = await c.req.json<unknown>()
		middleware(body, schema)
		await next();
	} catch (error) {
		if (error instanceof ZodError) {
			return c.json({ status: 400, message: "Error in parse body", data: error.errors }, 400);
		}
		return c.json({ status: 400, message: "Internal Server Error", data: null }, 500);
	}
}
