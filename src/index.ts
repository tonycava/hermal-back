import { Hono } from 'hono';
import AuthRouter from "@/auth/AuthRouter";

const app = new Hono();

const PORT = Bun.env.PORT || 3000;

app.get("/", (c) => {
	return c.text("Hello World!");
})

app.route("/auth", AuthRouter);

export default {
	port: PORT,
	fetch: app.fetch,
};
