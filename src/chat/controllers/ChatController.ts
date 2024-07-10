import { Context } from 'hono';
import { Socket } from 'socket.io';
import { AddChatDto } from '@/chat/interfaces/dto/AddChatDto';
import { OnChatUseCase } from '@/chat/usecases/OnChatUseCase';
import { OnGetChatUseCase } from '@/chat/usecases/OnGetChatUseCase';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';
import { OnGetGroupUseCase } from '@/chat/usecases/OnGetGroupUseCase';
import { JwtPayload } from '@/common/interfaces/JwtPayload';

const getChat = async (c: Context) => {
	const result = await OnGetChatUseCase(c.req.param('groupId'), ChatSqliteRepository());
	return c.json(result, result.status);
};

const getGroup = async (c: Context) => {
	const user = c.get('user') as JwtPayload;
	const result = await OnGetGroupUseCase(user.id, ChatSqliteRepository());
	return c.json(result, result.status);
};

export const onChat = async (socket: Socket, data: AddChatDto) => {
	const result = await OnChatUseCase(data, ChatSqliteRepository());
	socket.to(data.groupId).emit('message', data);
};


export default {
	getChat,
	getGroup,
	onChat
};

