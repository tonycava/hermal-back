import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { logger } from 'hono/logger';

import AuthRouter from "@/auth/AuthRouter";
import ChatRouter from "@/chat/ChatRouter";

import { StatusCode } from '@/common/interfaces/StatusCode';

import "@/ws.router"

const app = new Hono();

const PORT = Bun.env.PORT || 3000;

app.use('*', cors())
app.use(logger())

app.get("/", (c) => c.text("Hello, world!"))

app.onError((handle, c) => {
	const cause = handle.cause as { status: StatusCode; data: unknown };
	return c.json({ message: handle.message, status: cause.status, data: cause.data }, cause.status);
})

app.route("/auth", AuthRouter);
app.route("/chats", ChatRouter);

export default {
	port: PORT,
	fetch: app.fetch
};
