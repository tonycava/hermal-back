import jwt from "jsonwebtoken";
import { JwtPayload } from "@/common/interfaces/JwtPayload";

export const signToken = (payload: JwtPayload) => {
	return jwt.sign(payload, Bun.env.JWT_SECRET!, { expiresIn: "1d" });
}