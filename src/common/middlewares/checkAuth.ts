import { Context } from "hono";
import { JwtPayload } from "@/common/interfaces/JwtPayload";
import jwt from "jsonwebtoken";
import { NextFunction } from "@/common/interfaces/NextFunction";

export const checkToken = async (
	token: string | undefined
): Promise<[boolean, null | JwtPayload]> => {
	if (!token) return [false, null];
	try {
		const payload = jwt.verify(token, Bun.env.JWT_SECRET!) as JwtPayload;
		return [true, payload];
	} catch (error) {
		return [false, null];
	}
};

export const checkAuth = async (c: Context, next: NextFunction) => {
	const [isValid, payload] = await checkToken(c.req.header("Authorization"));
	if (isValid) {
		c.set('user', payload)
		await next();
		return;
	}
	return c.json({ message: "Unauthorized", status: 401, data: null }, 401);
}


