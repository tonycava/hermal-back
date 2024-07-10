import { Hono } from 'hono';
import { CheckBodyMiddleware } from '@/common/middlewares/middleware';
import ChatController from './controllers/ChatController';
import { checkAuth } from '@/common/middlewares/checkAuth';
import { isUserInGroup } from '@/chat/middlewares/isUserInGroup';
import { uuidDto } from '@/common/interfaces/dto/UuidDto';
import GroupController from '@/chat/controllers/GroupController';
import { addGroupDto } from '@/chat/interfaces/dto/AddGroupDto';
import UserController from '@/chat/controllers/UserController';

const ChatRouter = new Hono();

ChatRouter.get(
	'/groups',
	checkAuth,
	GroupController.getGroups
);

ChatRouter.get(
	'/search-user',
	checkAuth,
	UserController.searchUser
);

ChatRouter.post(
	'/groups/create',
	checkAuth,
	async (c, next) => CheckBodyMiddleware(await c.req.json(), next, addGroupDto),
	GroupController.createGroup
);

ChatRouter.get(
	'/:groupId',
	checkAuth,
	(c, next) => CheckBodyMiddleware(c.req.param('groupId'), next, uuidDto),
	isUserInGroup,
	ChatController.getChats
);


export default ChatRouter;
