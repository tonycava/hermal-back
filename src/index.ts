import { Hono } from 'hono';
import { cors } from 'hono/cors'

import AuthRouter from "@/auth/AuthRouter";

import "@/WsRouteur"

const app = new Hono();

const PORT = Bun.env.PORT || 3000;

app.use('*', cors())

app.get("/", (c) => c.text("Hello World!"))

app.route("/auth", AuthRouter);

export default {
	port: PORT,
	fetch: app.fetch
};
