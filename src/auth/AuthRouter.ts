import { Hono } from "hono";
import { CheckBodyMiddleware } from "@/common/middlewares/middleware";
import { loginDto } from "@/auth/interfaces/dto/LoginDto";
import { RegisterController } from "@/auth/controllers/RegisterController";
import { LoginController } from "@/auth/controllers/LoginController";
import { registerDto } from "@/auth/interfaces/dto/RegisterDto";

const AuthRouter = new Hono()

AuthRouter.post(
	"/register",
	async (c, next) => CheckBodyMiddleware(await c.req.json(), next, registerDto),
	RegisterController,
	LoginController
)

AuthRouter.post(
	"/login",
	async (c, next) => CheckBodyMiddleware(await c.req.json(), next, loginDto),
	LoginController
)

export default AuthRouter;
