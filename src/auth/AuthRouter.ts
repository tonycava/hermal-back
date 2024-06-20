import { Hono } from "hono";
import { CheckBodyMiddleware } from "@/common/middleware";
import { loginDto } from "@/auth/interfaces/dto/LoginDto";
import { RegisterController } from "@/auth/controllers/RegisterController";
import { LoginController } from "@/auth/controllers/LoginController";
import { registerDto } from "@/auth/interfaces/dto/RegisterDto";

const AuthRouter = new Hono()

AuthRouter.post(
	"/register",
	(c, next) => CheckBodyMiddleware(c, next, registerDto),
	RegisterController,
	LoginController
)

AuthRouter.post(
	"/login",
	(c, next) => CheckBodyMiddleware(c, next, loginDto),
	LoginController
)

export default AuthRouter;