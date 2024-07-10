import { Hono } from "hono";
import { CheckBodyMiddleware } from "@/common/middlewares/middleware";
import ChatController from "./controllers/ChatController";
import { checkAuth } from "@/common/middlewares/checkAuth";
import { isUserInGroup } from "@/chat/middlewares/isUserInGroup";
import { uuidDto } from '@/common/interfaces/dto/UuidDto';

const ChatRouter = new Hono()

ChatRouter.get(
	"/groups/:groupId",
	checkAuth,
	(c, next) => CheckBodyMiddleware(c.req.param("groupId"), next, uuidDto),
	isUserInGroup,
	ChatController.getGroup
);

ChatRouter.get(
	"/:groupId",
	checkAuth,
	(c, next) => CheckBodyMiddleware(c.req.param("groupId"), next, uuidDto),
	isUserInGroup,
	ChatController.getChat
);

export default ChatRouter;
