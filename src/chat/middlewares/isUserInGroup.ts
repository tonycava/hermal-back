import { Context, Next } from 'hono';
import { JwtPayload } from '@/common/interfaces/JwtPayload';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';

export const isUserInGroup = async (c: Context, next: Next) => {
	const groupId = c.req.param('groupId');
	const user = c.get('user') as JwtPayload;

	const isUserInGroup = await ChatSqliteRepository().isUserInGroup(user.id, groupId);

	if (!isUserInGroup) {
		throw new Error('You are not in this group', { cause: { status: 400, data: null } });
	}

	await next();
	return;
};
